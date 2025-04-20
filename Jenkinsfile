namespace = "production"
serviceName = "app-movie"


def groovyMethods

m1 = System.currentTimeMillis()

pipeline {
  agent {
    label 'jenkins-docker-agent'
  }

  tools {
    nodejs "NodeJS"
    dockerTool "Docker"
  }

  environment {
    DOCKER_CREDENTIALS = credentials("docker")
    IMAGE_NAME = "khandelwalshubham2" + "/" + "movie"
    IMAGE_TAG = "stable-${BUILD_NUMBER}"
  }

  stages {
    stage("Cleanup Workspace") {
      steps {
        cleanWs()
      }
    }

    stage("Prepare Environment") {
      steps {
        sh "[ -d pipeline ] || mkdir pipeline"
        dir("pipeline") {
          // Add your jenkins automation url to url field
          git branch: 'main', url: 'https://github.com/khandelwalshubham2/jenkins-common'
          script {
            groovyMethods = load("functions.groovy")
          }
        }
        // Add your chat review url to url field
        git branch: 'main', url: 'https://github.com/khandelwalshubham2/movie-service'
        sh 'npm install'
      }
    }

  }
  post {
    success {
      echo "success"
    }
    failure {
     echo "fail"
    }
  }
}