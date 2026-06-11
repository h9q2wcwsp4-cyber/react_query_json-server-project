pipeline {

    agent any


    stages {


        stage('Docker Compose Build') {

            steps {

                sh '''

                docker compose build

                '''

            }

        }



        stage('Deploy') {

            steps {

                sh '''

                docker compose down

                docker compose up -d

                '''

            }

        }



        stage('Check Container') {

            steps {

                sh '''

                docker ps

                '''

            }

        }


    }


    post {

        success {

            echo '배포 성공'

        }


        failure {

            echo '배포 실패'

        }

    }

}