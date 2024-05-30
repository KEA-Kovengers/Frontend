pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker_credentials'
        DOCKER_HUB_USERNAME = 'kovengers'
        IMAGE_NAME = 'frontend'
        VERSION = "${env.BUILD_NUMBER}" // Jenkins 빌드 번호를 버전으로 사용합니다.
    }
    stages {
        stage('Pull Git Submodules') {
            steps {
                sh 'git submodule update --init --recursive'
            }
        }
        stage('Copy YAML File') {
            steps {
                script{
                    sh('sudo cp ' + WORKSPACE+'/config/frontend-api-key/.env' + ' ' + WORKSPACE)
                }
            }
        }
        stage('Build Docker images') {
            steps {
                script {
                    docker.build("${DOCKER_HUB_USERNAME}/${IMAGE_NAME}", "-t ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest -t ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION} .")
                }
            }
        }
        stage('Push Docker images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_CREDENTIAL_ID}") {
                        // 'latest' 태그 푸시
                        docker.image("${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest").push()
                        // 버전 태그 푸시
                        docker.image("${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}").push()
                    }
                }
            }
        }
        stage('Docker image cleanup') {
            steps {
                script {
                    sh 'docker rmi ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest'
                    sh 'docker rmi ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}'
                    sh 'docker rmi registry.hub.docker.com/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest'
                    sh 'docker rmi registry.hub.docker.com/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}'
                }
            }
        }
        stage('Update Kubernetes YAML') {
            steps {
                script {
                    dir('config'){
                        sshagent(['k8s_git']) {
                            sh 'mkdir -p ~/.ssh'
                            sh 'if [ ! -f ~/.ssh/known_hosts ]; then ssh-keyscan github.com >> ~/.ssh/known_hosts; fi'
                            sh 'rm -rf kubernetes-yaml' // Add this line
                            sh 'git clone git@github.com:KEA-Kovengers/kubernetes-yaml.git'
                        }
                        dir('kubernetes-yaml') {
                            dir('frontend'){
                                sh "sed -i 's|${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:.*|${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}|' frontend.yaml"
                            }
                            
                            sh 'git config user.email "keakovengers@gmail.com"'
                            sh 'git config user.name "kovengers"'
                            sh 'git add -A'
                            sh 'git status'
                            sh 'git diff --cached --exit-code || git commit -m "Update frontend service image tag"'
                            sshagent(['k8s_git']) {
                                sh 'git push origin kakao-cloud'
                            }
                        }
                    }
                }
            }
        }
    }
}