pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker_credentials'
        DOCKER_HUB_USERNAME = 'kovengers'
        IMAGE_NAME = 'frontend'
        VERSION = "${env.BUILD_NUMBER}" // Jenkins 빌드 번호를 버전으로 사용합니다.
    }
    stages {
        stage('Copy YAML File') {
            steps {
                script{
                    // 파일명 폴더 아이디 수정
                    withCredentials([file(credentialsId: 'frontend', variable: 'FE_API_KEY_FILE')]) {
                        // 파일 복사 명령 실행
                        // sh('sudo mkdir -p ' + WORKSPACE + '/config/frontend-api-key/')
                        // sh('sudo cp ' + FE_API_KEY_FILE + ' ' + WORKSPACE + '/config/frontend-api-key/')
                        sh('sudo cp ' + FE_API_KEY_FILE + ' ' + WORKSPACE)
                    }
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
        stage('Kubernetes deploy') {
            steps{
                script {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                        sh "kubectl --kubeconfig=${KUBECONFIG} rollout restart deployment/frontend-deployment"
                    }
                }
            }    
        }
    }
}