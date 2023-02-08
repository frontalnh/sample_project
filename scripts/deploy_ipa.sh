set -e
export CURRENT_PROJECT_VERSION=$(git rev-list master --first-parent --count)
export MARKETING_VERSION=$(cat ./package.json|jq '.version' | sed -r 's/"//g')
cd ios
# rm -rf Pods Podfile.lock
# pod install --repo-update
# pod update
fastlane beta