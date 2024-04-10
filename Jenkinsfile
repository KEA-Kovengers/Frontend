pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker_credentials'
        DOCKER_HUB_USERNAME = 'kovengers'
        IMAGE_NAME = 'frontend'
        VERSION = "${env.BUILD_NUMBER}" // Jenkins 빌드 번호를 버전으로 사용합니다.
    }
    stages {
        stage('Build Docker images') {
            steps {
                script {
                    docker.build("${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}") // 이미지 빌드 및 버전 태그
                }
            }
        }
        stage('Push Docker images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_CREDENTIAL_ID}") {
                        docker.image("${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}").push() // Docker Hub에 푸시
                    }
                }
            }
        }
        stage('Docker image cleanup') {
            steps {
                script {
                    sh 'docker rmi ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}'
                    sh 'docker rmi registry.hub.docker.com/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${VERSION}'
                }
            }
        }
    }
}