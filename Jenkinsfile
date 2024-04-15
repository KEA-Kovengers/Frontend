pipeline {
    agent any
    environment {
        DOCKER_CREDENTIAL_ID = 'docker_credentials'
        DOCKER_HUB_USERNAME = 'kovengers'
        IMAGE_NAME = 'my-app'
        VERSION = "${env.BUILD_NUMBER}" // Jenkins 빌드 번호를 버전으로 사용합니다.
    }
    stages {
        stage('Copy YAML File') {
            steps {
                script{
                    if (env.ARTICLE_SERVICE_CHANGED == 'true') {
                    // YAML 파일을 credential로부터 읽어와서 특정 위치에 복사
                    withCredentials([file(credentialsId: 'article-application', variable: 'ARTICLE_YML_FILE')]) {
                        // 파일 복사 명령 실행
                        sh('mkdir -p ' + WORKSPACE + '/config/article-service-module/')
                        sh('cp ' + ARTICLE_YML_FILE + ' ' + WORKSPACE + '/config/article-service-module/application.yml')
                    }
                    }
                    if (env.USER_SERVICE_CHANGED == 'true') {
                        // YAML 파일을 credential로부터 읽어와서 특정 위치에 복사
                        withCredentials([file(credentialsId: 'user-application', variable: 'USER_YML_FILE')]) {
                            // 파일을 빌드 디렉토리 내 특정 위치로 복사
                            // 파일 복사 명령 실행
                            sh('mkdir -p ' + WORKSPACE + '/config/user-service-module/')
                            sh('cp ' + USER_YML_FILE + ' ' + WORKSPACE + '/config/user-service-module/application.yml')
                        }
                    }
                }
            }
        }
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