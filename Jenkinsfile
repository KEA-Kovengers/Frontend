pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker_credentials'
        DOCKER_HUB_USERNAME = 'kovengers'
        IMAGE_NAME = 'frontend'
        VERSION = "${env.BUILD_NUMBER}" // Jenkins 빌드 번호를 버전으로 사용합니다.
    }
        stage('Pull Git Submodules') {
            steps {
                sh 'git submodule update --init --recursive'
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
        // stage('Kubernetes deploy') {
        //     steps{
        //         script {
        //             withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
        //                 sh 'kubectl --kubeconfig=$KUBECONFIG rollout restart deployment/frontend-deployment'
        //             }
        //         }
        //     }    
        // }
    }
}