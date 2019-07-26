pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'cnpm install'
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'sudo systemctl stop nginx.service'
        sh 'sudo rm  -rf /usr/share/nginx/html/*'
        sh 'mv -f ./dist/* /usr/share/nginx/html/*'
        sh 'sudo systemctl start nginx.service'
      }
    }
  }
}