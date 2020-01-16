#!/usr/bin/env groovy
pipeline {
    agent any

    environment {
        NEXUS_REPOSITORY_USERNAME = credentials('NEXUS_REPOSITORY_USERNAME')
        NEXUS_REPOSITORY_PASSWORD = credentials('NEXUS_REPOSITORY_PASSWORD')
        JENKINS_IMMPORT_AWS_ACCESS_KEY = credentials('JENKINS_IMMPORT_AWS_ACCESS_KEY')
        JENKINS_IMMPORT_AWS_SECRET_KEY = credentials('JENKINS_IMMPORT_AWS_SECRET_KEY')
    }

    triggers {
        pollSCM('H/1 * * * *')
    }

    options { disableConcurrentBuilds() }
    
    stages {
        stage('Clean') {
            steps {
                sh './gradlew --no-daemon clean'
            }
        }
        stage('Build') {
            steps {
                sh './gradlew --no-daemon build -x test'
                sh 'printenv'
                sh 'echo immport-portal-1.2.9.RELEASE >> build_version.txt'
            }
        }
        stage('Test') {
            steps {
                sh './gradlew --no-daemon test'
            }
        }        
        // stage('Publish to Nexus') {
        //     steps {
        //         sh './gradlew --no-daemon publishArtifactPublicationToRemoteRepository'
        //         sh 'printenv'
        //     }
        // }
        stage('AWS Codedeploy') {
            steps {
                sh 'export BUILD_DISPLAY_NAME=immport-portal'
                sh 'printenv'
                script {
                    def props = readProperties file:'build/resources/main/git.properties';
                    env.IMMPORT_JENKINS_PROJECT_NAME = props['project_name'];
                    env.IMMPORT_JENKINS_PROJECT_VERSION = props['project_version'];
                }
			    withCredentials([
                    string(credentialsId: 'JENKINS_IMMPORT_AWS_ACCESS_KEY', variable: 'codeDeployAccessKey'),
                    string(credentialsId: 'JENKINS_IMMPORT_AWS_SECRET_KEY', variable: 'codeDeploySecretKey')]) {

                    step([
                        $class: 'AWSCodeDeployPublisher', 
                        applicationName: 'immport-portal', 
                        awsAccessKey: codeDeployAccessKey, 
                        awsSecretKey: codeDeploySecretKey, 
                        credentials: 'awsAccessKey', 
                        deploymentConfig: 'CodeDeployDefault.OneAtATime', 
                        deploymentGroupAppspec: false, 
                        deploymentGroupName: 'immport-portal-devGrp', 
                        excludes: '', 
                        iamRoleArn: '', 
                        includes: '**', 
                        proxyHost: '', 
                        proxyPort: 0, 
                        region: 'us-east-2', 
                        s3bucket: 'cicdstackdemo-codedeploybucket-1xm7w2kefj6ku', 
                        s3prefix: 'immport-codedeploy', 
                        subdirectory: '', 
                        versionFileName: 'build_version.txt', 
                        waitForCompletion: true
                    ])		

		        }
            }
        }
    }
}