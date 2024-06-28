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
                    sh 'docker build -t sakilamadhushanabc585/backend-image .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker compose up -d 3000:3000 sakilamadhushanabc585/backend-image'


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
                withCredentials([string(credentialsId: 'dockerhub_password1', variable: 'Dockerhub1')]) {
                    script {
                        sh "docker login -u sakilamadhushanabc585 -p ${Dockerhub1}"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                script {
                    retry(3) {
                        echo 'Pushing Docker image to Docker Hub...'
                        sh 'docker push sakilamadhushanabc585/backend-image'
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
