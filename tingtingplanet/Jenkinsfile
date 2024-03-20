pipeline {
    agent any
    environment {
        BRANCH = "$env.BRANCH_NAME"
        BUILD_CONF = credentials("tingting-jenkins-conf")
        KUBE_SECRET = credentials("tingting-kube-secret")
        KUBE_CONFIG = credentials("tingting-kube-config")
        ORGS = "seniorlove,localjobs"
        ALL_CLIENTS = "seniorlove/frontend,localjobs/frontend"
        ALL_SERVERS = "seniorlove/backend,localjobs/backend"
        SERVER_LIBS="external/module,shared/module,shared/util-server,social/module"
    }
    stages {
        stage("Boot"){
            steps{
                sh "cp $BUILD_CONF .jenkins.conf"
                load ".jenkins.conf"
                discordSend description: "Build Start - $env.JOB_NAME $env.BUILD_NUMBER", link: env.BUILD_URL, result: currentBuild.currentResult, title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
                sh "tar -cvf codebase.tar ./"
                // sh "tar --exclude=.git -cvf codebase.tar ./"
            }
        }
        stage("Prepare"){
            parallel{
                stage("Prepare Master"){
                    steps{
                        sh "ssh -o StrictHostKeyChecking=no $MS_USER@$MS_HOST -p $MS_PORT \"mkdir -p $REPO_NAME/$BRANCH/node_modules && touch $REPO_NAME/$BRANCH/dummy.js\""
                        sh "ssh -p $MS_PORT $MS_USER@$MS_HOST \"cd $REPO_NAME/$BRANCH && find . -maxdepth 1 ! -path . ! \\( -name node_modules -or -name pnpm-lock.yaml -or -name dist -or -name .git \\) -print0 | xargs -0 sudo rm -r\""
                        sh "scp -P $MS_PORT codebase.tar $MS_USER@$MS_HOST:~/$REPO_NAME/$BRANCH/codebase.tar"
                        sh "ssh -p $MS_PORT $MS_USER@$MS_HOST \"cd $REPO_NAME/$BRANCH && tar -xvf codebase.tar\""
                        sh "scp -P $MS_PORT $KUBE_SECRET $MS_USER@$MS_HOST:~/$REPO_NAME/$BRANCH/infra/kubernetes/secrets.yaml"
                        script {
                            ORGS.tokenize(",").each { org -> 
                                sh "scp -P $MS_PORT $KUBE_CONFIG $MS_USER@$MS_HOST:~/$REPO_NAME/$BRANCH/infra/kubernetes/${org}.yaml"
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra/kubernetes && kubectl config use-context $org --kubeconfig ${org}.yaml\""
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra/kubernetes && (kubectl delete -f secrets.yaml -n $org-$BRANCH --kubeconfig ${org}.yaml || true) && kubectl apply -f secrets.yaml -n $org-$BRANCH --kubeconfig ${org}.yaml\""
                            }
                        }
                    }
                }
                stage("Prepare Build"){
                    steps{
                        sh "ssh -o StrictHostKeyChecking=no $B4_USER@$B4_HOST -p $B4_PORT \"mkdir -p $REPO_NAME/$BRANCH/node_modules && mkdir -p $REPO_NAME/$BRANCH/dist && touch $REPO_NAME/$BRANCH/dummy.js && sudo chmod -R 777 $REPO_NAME/$BRANCH/dist \""
                        sh "ssh -p $B4_PORT $B4_USER@$B4_HOST \"cd $REPO_NAME/$BRANCH && find . -maxdepth 1 ! -path . ! \\( -name node_modules -or -name package-lock.json -or -name dist -or -name .git \\) -print0 | xargs -0 sudo rm -r\""
                        sh "scp -P $B4_PORT codebase.tar $B4_USER@$B4_HOST:~/$REPO_NAME/$BRANCH/codebase.tar"
                        sh "ssh -p $B4_PORT $B4_USER@$B4_HOST \"cd $REPO_NAME/$BRANCH && tar -xvf codebase.tar\""
                        script {
                            commit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: "HEAD"
                            affected = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ? (sh (script: "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo pnpm nx print-affected --type=app --select=projects --base=$env.GIT_PREVIOUS_SUCCESSFUL_COMMIT\"", returnStdout: true).trim()) : "$ALL_CLIENTS,$ALL_SERVERS"
                            AFFECTED = affected.tokenize(", ");                            
                            // CLIENTS = ALL_CLIENTS.tokenize(",");
                            // SERVERS = ALL_SERVERS.tokenize(",");
                            CLIENTS = AFFECTED.intersect(ALL_CLIENTS.tokenize(","));
                            SERVERS = AFFECTED.intersect(ALL_SERVERS.tokenize(","));
                            ALL_CLIENTS.tokenize(",").each { app -> 
                                def envName = "$REPO_NAME-" + app.tokenize("/").join("-") + "-env-$BRANCH";
                                withCredentials([file(credentialsId: "$envName", variable: "ENV")]) {
                                    // sh "ssh -p $B4_PORT $B4_USER@$B4_HOST \"cd $REPO_NAME/$BRANCH/apps/$app && echo CLIENT_ENV=$BRANCH > .env\""
                                    sh "scp -P $B4_PORT $ENV $B4_USER@$B4_HOST:~/$REPO_NAME/$BRANCH/apps/$app/env/env.ts"
                                }
                            }
                            ALL_SERVERS.tokenize(",").each { app -> 
                                def envName = "$REPO_NAME-" + app.tokenize("/").join("-") + "-env-$BRANCH";
                                withCredentials([file(credentialsId: "$envName", variable: "ENV")]) {
                                    sh "scp -P $B4_PORT $ENV $B4_USER@$B4_HOST:~/$REPO_NAME/$BRANCH/apps/$app/src/environments/environment.ts"        
                                }
                            }
                            SERVER_LIBS.tokenize(",").each { app -> 
                                def envName = "$REPO_NAME-" + app.tokenize("/").join("-") + "-env-testing";
                                withCredentials([file(credentialsId: "$envName", variable: "ENV")]) {
                                    sh "scp -P $B4_PORT $ENV $B4_USER@$B4_HOST:~/$REPO_NAME/$BRANCH/libs/$app/src/_environments/environment.ts"
                                }
                            }
                        }
                    }
                }
            }
        }
        stage("Build"){
            steps {
                script {
                    BUILD_PROJECTS = (SERVERS + CLIENTS).join(",");
                    BUILD_SERVERS = SERVERS.join(",");
                    BUILD_CLIENTS = CLIENTS.join(",");
                    if(BUILD_PROJECTS.length() >=1) {
                        sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo pnpm install -w\""
                        sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo nx run-many --target=build --projects=$BUILD_SERVERS --parallel=1\""
                        sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo nx run-many --target=build --projects=$BUILD_CLIENTS --parallel=1\""
                        sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo nx graph --file=dist/graph.json\""
                        sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo cross-env DEPLOY_APPS=$BUILD_PROJECTS ts-node infra/_general/makeDocker.ts\""
                    }
                }
            }
        }
        stage("Dockerize"){
            steps {
                script {
                    def dockerizes = [:]
                    def maxConcurrentJobs = 4
                    (CLIENTS + SERVERS).each { app -> 
                        dockerizes[app] = {
                            sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo mkdir -p ./dist/apps/$app \""
                            sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo find ./apps/$app -name *.env -exec cp {} ./dist/apps/$app \\;\""
                            sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH && sudo find ./apps/$app \\( -type d -name dist \\) -exec rsync -avz {}/ ./dist/apps/$app/ \\;\""
                            sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH/dist/apps/$app && sudo docker build . -t $REG_URL/$REPO_NAME/$app:$BRANCH-$env.BUILD_NUMBER\" --label=\"repo=$REPO_NAME\" --label=\"branch=$BRANCH\" --label=\"buildNum=$env.BUILD_NUMBER\""
                            sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"sudo docker image tag $REG_URL/$REPO_NAME/$app:$BRANCH-$env.BUILD_NUMBER $REG_URL/$REPO_NAME/$app:$BRANCH-live\""
                            sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"docker push $REG_URL/$REPO_NAME/$app:$BRANCH-live\""
                        }
                    }
                    def totalJobs = dockerizes.size()
                    def totalBranches = totalJobs / maxConcurrentJobs
                    def jobNames = dockerizes.keySet()
                    def jobPlans = dockerizes.values()
                    for (int branch = 0; branch < totalBranches; branch++) {
                        def start = branch * maxConcurrentJobs
                        def end = ((branch + 1) * maxConcurrentJobs < totalJobs ? (branch + 1) * maxConcurrentJobs : totalJobs) - 1
                        def jobs = [:]
                        // stage("Dockerize $branch") {    
                        (start..end).each { index ->
                            jobs[jobNames[index]] = jobPlans[index]
                        }
                        parallel jobs
                        // }
                    }
                }
            }
        }
        stage("Deploy"){
            steps {
                script {
                    def deploys = [:]
                    (ALL_SERVERS + "," + ALL_CLIENTS).tokenize(",").each { app -> 
                        def orgName = app.tokenize("/")[0]
                        def appName = app.tokenize("/")[1]
                        if((SERVERS).contains(app)) {
                            deploys[app] = {
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra && sudo kubectl apply -f $BRANCH/${app}.yaml -n $orgName-$BRANCH --kubeconfig kubernetes/${orgName}.yaml\""
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra && sudo kubectl rollout restart deployments/$appName-federation-deployment -n $orgName-$BRANCH --kubeconfig kubernetes/${orgName}.yaml\""
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra && sudo kubectl rollout restart deployments/$appName-batch-deployment -n $orgName-$BRANCH --kubeconfig kubernetes/${orgName}.yaml\""
                            }
                        } else if((CLIENTS).contains(app)) {
                            deploys[app] = {
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra && sudo kubectl apply -f $BRANCH/${app}.yaml -n $orgName-$BRANCH --kubeconfig kubernetes/${orgName}.yaml\""
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra && sudo kubectl rollout restart deployments/$appName-deployment -n $orgName-$BRANCH --kubeconfig kubernetes/${orgName}.yaml\""
                            }
                        } else {
                            deploys[app] = {
                                sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra && sudo kubectl apply -f $BRANCH/${app}.yaml -n $orgName-$BRANCH --kubeconfig kubernetes/${orgName}.yaml\""
                            }
                        }
                    }
                    
                    parallel deploys
                }
            }
        }
        // stage("Publish"){
        //     when { branch "main" }
        //     steps {
        //         script {
        //             def publishes = [:]
        //             LIBS.tokenize(",").each { lib -> 
        //                 publishes[lib] = {
        //                     sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH/dist/libs/$lib && sudo npm version 0.0.$BUILD_NUMBER && sudo npm publish\""
        //                 }
        //             }
        //             parallel publishes
        //         }
        //     }
        // }
        stage("Cleanup"){
            parallel {
                stage("Clean Master Registry"){
                    steps{
                        sh "ssh $MS_USER@$MS_HOST -p $MS_PORT \"cd $REPO_NAME/$BRANCH/infra/_general/registry && chmod +x cleanup-registry.sh && ./cleanup-registry.sh\""
                    }
                }
                stage("Clean Build Registry"){
                    steps {
                        discordSend description: "Build Finished! Cleaning up... - $env.JOB_NAME $env.BUILD_NUMBER", link: env.BUILD_URL, result: currentBuild.currentResult, title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
                        sh "ssh $B4_USER@$B4_HOST -p $B4_PORT \"cd $REPO_NAME/$BRANCH/infra/_general/registry && chmod +x cleanup-agent.sh && ./cleanup-agent.sh $REG_URL/$REPO_NAME $BRANCH $env.BUILD_NUMBER\""
                    }
                }
            }
        }
    }
    post {
        failure {
            discordSend description: "Build Failed - $env.JOB_NAME $env.BUILD_NUMBER", link: env.BUILD_URL, result: currentBuild.currentResult, title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        success {
            script {
                discordSend description: "Build Succeed - $env.JOB_NAME $env.BUILD_NUMBER", link: env.BUILD_URL, result: currentBuild.currentResult, title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
                if(env.BRANCH_NAME != "debug") {
                    def commit_messages = sh(script: "git log $env.GIT_PREVIOUS_SUCCESSFUL_COMMIT..HEAD --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cD) %C(bold blue)<%an>%Creset'", returnStdout: true)
                    commit_messages = commit_messages.trim().replaceAll("\\n", "\n")
                    discordSend title: "$env.JOB_NAME:$env.BUILD_NUMBER 빌드 배포 완료", description: commit_messages, result: currentBuild.currentResult, customUsername: "TingTing Update", customAvatarUrl: "https://media.discordapp.net/stickers/952935228865933363.png", webhookURL: env.DISCORD_PUBLIC_WEBHOOK
                }
            }
        }
    }
}
