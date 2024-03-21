#!/bin/bash
SECRET_MAP=( \
"apps/junblog/backend/src/environments/environment.local.ts,junJS-junblog-backend-env-local,local,0" \ 
"apps/junblog/backend/src/environments/environment.test.ts,junJS-junblog-backend-env-test,test,8000" \ 
"apps/junblog/backend/src/environments/environment.main.ts,junJS-junblog-backend-env-main,main,8001" \ 
"apps/junblog/frontend/env/env.local.ts,junJS-junblog-frontend-env-local,local,0" \
"apps/junblog/frontend/env/env.test.ts,junJS-junblog-frontend-env-test,test,7000" \
"apps/junblog/frontend/env/env.main.ts,junJS-junblog-frontend-env-main,main,7001" \
)

for SECRET in ${SECRET_MAP[@]}; do
    echo ${SECRET}
done
exit 0