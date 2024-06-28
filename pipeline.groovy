pipeline {
    agent any

    stages {
        stage('SCM checkout') {
            steps {
                retry(3) {
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Madhushan11/Backend.git']])
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t umeshgayashan/backend-image .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker compose up -d'


                }
            }
        }
        stage('Show Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub_password', variable: 'Dockerhub')]) {
                    script {
                        sh "docker login -u umeshgayashan -p ${Dockerhub}"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                script {
                    retry(3) {
                        echo 'Pushing Docker image to Docker Hub...'
                        sh 'docker push umeshgayashan/backend-image'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
