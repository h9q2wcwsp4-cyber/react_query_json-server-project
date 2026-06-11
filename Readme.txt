docker build -t my-jenkins .

docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home my-jenkins

docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  my-jenkins

  25bc9be2603b839dbc9c9754132f4fd36089a6dc654a38b4b03de82602802db7

  86f0fb7688d24917bd3032ef332309a9