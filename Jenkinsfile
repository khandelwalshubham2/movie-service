pipeline {
  agent {
    label 'jenkins-docker-agent'
  }



  environment {
    DOCKERHUB_CREDENTIAL = credentials("docker")
    IMAGE_NAME = "khandelwalshubham2/movie"
    IMAGE_TAG = "stable-${BUILD_NUMBER}"
    NAMESPACE = "production"
    SERVICE_NAME = "app-movie"
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
          git branch: 'main', url: 'https://github.com/khandelwalshubham2/jenkins-common'
          script {
            groovyMethods = load("functions.groovy")
          }
        }

        git branch: 'main', url: 'https://github.com/khandelwalshubham2/movie-service'
        sh 'npm install'
      }
    }

     stage("Build and Push") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKERHUB_CREDENTIAL_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
          // Docker login using the credentials
          sh """
            echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIAL_USR --password-stdin
          """
        }
        sh "docker build -t $IMAGE_NAME ."
        sh "docker tag $IMAGE_NAME $IMAGE_NAME:$IMAGE_TAG"
        sh "docker tag $IMAGE_NAME $IMAGE_NAME:stable"
        sh "docker push $IMAGE_NAME:$IMAGE_TAG"
        sh "docker push $IMAGE_NAME:stable"
      }
    }
    stage('Check Pods in Production') {
      steps {
        withKubeCredentials(kubectlCredentials: [[
          credentialsId: 'k8s-token',
          serverUrl: 'https://kubernetes.docker.internal:6443',
          clusterName: '',
          contextName: ''
        ]]) {
          sh 'kubectl delete pods -l app=app-movie -n production'
        }
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
