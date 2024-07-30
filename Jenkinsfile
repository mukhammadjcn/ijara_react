pipeline {
    agent any
    
    stages {
        stage('my_edu update') {
            steps {
                sh 'ansible-playbook /var/lib/jenkins/ansible/ijara_edu.yml -l prof_e-edu'
            }
        }
    }
}
