def IMAGE_TAG = null
def remote = [:]
pipeline {
    agent {
        label 'master'
    }
    stages {
		
		stage('Build') {
			steps {
				script {
					IMAGE_TAG = "$GIT_COMMIT".take(7)
				}
				sh "echo ${IMAGE_TAG}"  
				withCredentials([usernamePassword(credentialsId: 'cc8e493d-fe72-441b-8ffd-96ec86877c2d', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
					sh "docker login $DOCKER_REGISTRY -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
					sh "docker build -t $DOCKER_REGISTRY/$DOCKER_REPO:$IMAGE_TAG ."
					sh "docker push $DOCKER_REGISTRY/$DOCKER_REPO:$IMAGE_TAG"
					sh "docker rmi -f $DOCKER_REGISTRY/$DOCKER_REPO:$IMAGE_TAG"
				}
			}
		}
		stage('Deploy'){
			steps {
				script {
					withCredentials([usernamePassword(credentialsId: '65f1a44b-0c4a-4057-965f-8689d2e2a0ba', passwordVariable: 'HOST_PASSWORD', usernameVariable: 'HOST_USERNAME')]) {
						remote.name = "$HOST_NAME"
						remote.host = "$HOST_NAME"
						remote.user = "$HOST_USERNAME"
						remote.password = "$HOST_PASSWORD"
						remote.allowAnyHosts = true
					}
				}
				sshCommand remote: remote, command: "docker service rm ims-ui || echo 'service dosent exist'"
				sshCommand remote: remote, command: "docker images $DOCKER_REGISTRY/$DOCKER_REPO -q| xargs docker rmi -f || echo 'no tags for this image'"
				sshCommand remote: remote, command: "docker pull $DOCKER_REGISTRY/$DOCKER_REPO:$IMAGE_TAG"
				sshCommand remote: remote, command: "docker service create --name ims-ui --network ims --publish 5002:80 $DOCKER_REGISTRY/$DOCKER_REPO:$IMAGE_TAG"
				
			}
		}
		stage('Clean-Workspace'){
			steps{
				cleanWs()
			}
		}
	}		
}

