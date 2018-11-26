pipeline {
   agent any
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
   stages {
      stage('NPM Setup') {
      steps {
         sh 'npm install'
      }
   }


   stage('Android Build') {
   steps {
    //   sh 'expo login -u anisbasak -p 1248pichuling' 
      sh 'npm run android'
    // sh 'expo start'
   }
  }

   
 }
}