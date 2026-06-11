pipeline {

    agent any


    stages {


        stage('Git Clone') {

            steps {

                git branch: 'main',
                    url: 'https://github.com/사용자명/저장소명.git'

            }

        }



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