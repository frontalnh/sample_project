def DEPLOY_TO
def COMMITS

pipeline {
    // 스테이지 별로 다른 거
    // 여기 설정안하고 any 로 하면 executer 들끼리 경쟁 붙어서 deadlock 발생했음
    agent { label 'master' }

    environment {
      AWS_DEFAULT_REGION = 'ap-northeast-2'
      LC_ALL="en_US.UTF-8" // pod install 시에 코코아 팟에서 버그 나오는거 수정
      // HOME = '.' // Avoid npm root owned
    }

    stages {
      stage('Decide Deploy To') {
        steps {
          script {
            if (env.BRANCH_NAME == 'master'){
              DEPLOY_TO = 'prod'
            } else if (env.BRANCH_NAME == 'develop'){
              DEPLOY_TO = 'dev'
            } else if (env.BRANCH_NAME == 'qa'){
              DEPLOY_TO = 'qa'
            }
          }

          echo "DEPLOY_TO: ${DEPLOY_TO}"
        }
      }
      
      stage('Prepare') {
        steps {
          echo "Clonning Repository. Previous Git Commit: ${env.GIT_PREVIOUS_COMMIT}. Current Git Commit: ${env.GIT_COMMIT}"
          // script {
            // COMMITS = sh(encoding: 'UTF-8',returnStdout: true,script:"git --no-pager log --abbrev-commit --pretty=%B ${env.GIT_PREVIOUS_COMMIT}..master")
          // }
          
          git url: 'https://github.com/frontalnh/sample_project.git',
              branch: 'master',
              credentialsId: 'jenkinsgit'
        }

        post {
            success {
              echo 'Successfully Cloned Repository'
              // slackSend(channel: "배포", message: "[RNAPP] 코드 업데이트가 감지되었습니다. 빌드를 시작합니다.\n현재 커밋 해시: ${env.GIT_COMMIT}\n이전 커밋 해시: ${env.GIT_PREVIOUS_COMMIT}\n\n업데이트 내역\n$COMMITS")
            }
        }
      }

      stage('Deploy android') {
        when {
          expression {
            return env.BRANCH_NAME == 'master';
          }
        }
        steps {
          echo "안드로이드를 배포합니다."

          dir('android/app') {
            withCredentials([file(credentialsId: 'rnapp_keystore', variable: 'FILE')]) {
              sh 'cp -f "$FILE" "./"'
            }
          }

          sh """
            java -version
            ./scripts/deploy_apk.sh ${DEPLOY_TO}
          """
        }

        post {
          success {
            echo "안드로이드 배포 성공"
            // slackSend(channel: "배포", message: "[RNAPP - Android] 배포가 완료되었습니다.\n\n업데이트 내역\n$COMMITS")
          }
          failure {
            // slackSend(channel: "배포", message: "[RNAPP - Android] 배포에 실패했습니다.")
            error '[RNAPP - Android] 배포에 실패했습니다.'
          }
        }
      }

      stage('Deploy ios') {
        when {
          expression {
            return env.BRANCH_NAME == 'master';
          }
        }

        steps {
          echo "RNAPP ios를 배포합니다."

          sh """    
            cd ios && pod install && cd ../
            ./scripts/deploy_ipa.sh ${DEPLOY_TO}
          """
        }

        post {
          success {
            echo 'ios 배포 성공'
            // slackSend(channel: "배포", message: "[RNAPP - Ios] 배포가 완료되었습니다.\n\n업데이트 내역\n$COMMITS\n아래 테스트 플라이트에서 수출문서만 등록하면 테스트플라이트 이용이 가능합니다.\nhttps://appstoreconnect.apple.com/apps/dd/testflight/ios")
          }
          failure {
            // slackSend(channel: "배포", message: "[RNAPP - Ios] 배포에 실패했습니다.")
            error '[RNAPP - Ios] 배포에 실패했습니다.'
          }
        }
      }
    }
}
