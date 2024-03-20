#!/bin/bash
SECRET_MAP=( \
"apps/localjobs/backend/src/environments/environment.testing.local.ts,tingting-localjobs-backend-env-testing-local,local" \
"apps/localjobs/backend/src/environments/environment.testing.ts,tingting-localjobs-backend-env-testing,testing" \
"apps/localjobs/backend/src/environments/environment.debug.local.ts,tingting-localjobs-backend-env-debug-local,local" \
"apps/localjobs/backend/src/environments/environment.debug.ts,tingting-localjobs-backend-env-debug,debug" \
"apps/localjobs/backend/src/environments/environment.develop.local.ts,tingting-localjobs-backend-env-develop-local,local" \
"apps/localjobs/backend/src/environments/environment.develop.ts,tingting-localjobs-backend-env-develop,develop" \
"apps/localjobs/backend/src/environments/environment.main.local.ts,tingting-localjobs-backend-env-main-local,local" \
"apps/localjobs/backend/src/environments/environment.main.ts,tingting-localjobs-backend-env-main,main" \
"apps/localjobs/frontend/env/env.testing.local.ts,tingting-localjobs-frontend-env-testing-local,local" \
"apps/localjobs/frontend/env/env.testing.ts,tingting-localjobs-frontend-env-testing,testing" \
"apps/localjobs/frontend/env/env.debug.local.ts,tingting-localjobs-frontend-env-debug-local,local" \
"apps/localjobs/frontend/env/env.debug.ts,tingting-localjobs-frontend-env-debug,debug" \
"apps/localjobs/frontend/env/env.develop.local.ts,tingting-localjobs-frontend-env-develop-local,local" \
"apps/localjobs/frontend/env/env.develop.ts,tingting-localjobs-frontend-env-develop,develop" \
"apps/localjobs/frontend/env/env.main.local.ts,tingting-localjobs-frontend-env-main-local,local" \
"apps/localjobs/frontend/env/env.main.ts,tingting-localjobs-frontend-env-main,main" \
"apps/seniorlove/backend/src/environments/environment.testing.local.ts,tingting-seniorlove-backend-env-testing-local,local" \
"apps/seniorlove/backend/src/environments/environment.testing.ts,tingting-seniorlove-backend-env-testing,testing" \
"apps/seniorlove/backend/src/environments/environment.debug.local.ts,tingting-seniorlove-backend-env-debug-local,local" \
"apps/seniorlove/backend/src/environments/environment.debug.ts,tingting-seniorlove-backend-env-debug,debug" \
"apps/seniorlove/backend/src/environments/environment.develop.local.ts,tingting-seniorlove-backend-env-develop-local,local" \
"apps/seniorlove/backend/src/environments/environment.develop.ts,tingting-seniorlove-backend-env-develop,develop" \
"apps/seniorlove/backend/src/environments/environment.main.local.ts,tingting-seniorlove-backend-env-main-local,local" \
"apps/seniorlove/backend/src/environments/environment.main.ts,tingting-seniorlove-backend-env-main,main" \
"apps/seniorlove/frontend/env/env.testing.local.ts,tingting-seniorlove-frontend-env-testing-local,local" \
"apps/seniorlove/frontend/env/env.testing.ts,tingting-seniorlove-frontend-env-testing,testing" \
"apps/seniorlove/frontend/env/env.debug.local.ts,tingting-seniorlove-frontend-env-debug-local,local" \
"apps/seniorlove/frontend/env/env.debug.ts,tingting-seniorlove-frontend-env-debug,debug" \
"apps/seniorlove/frontend/env/env.develop.local.ts,tingting-seniorlove-frontend-env-develop-local,local" \
"apps/seniorlove/frontend/env/env.develop.ts,tingting-seniorlove-frontend-env-develop,develop" \
"apps/seniorlove/frontend/env/env.main.local.ts,tingting-seniorlove-frontend-env-main-local,local" \
"apps/seniorlove/frontend/env/env.main.ts,tingting-seniorlove-frontend-env-main,main" \
"libs/external/module/src/_environments/environment.testing.local.ts,tingting-external-module-env-testing-local,local" \
"libs/external/module/src/_environments/environment.testing.ts,tingting-external-module-env-testing,testing" \
"libs/shared/module/src/_environments/environment.testing.local.ts,tingting-shared-module-env-testing-local,local" \
"libs/shared/module/src/_environments/environment.testing.ts,tingting-shared-module-env-testing,testing" \
"libs/shared/util-server/src/_environments/environment.testing.local.ts,tingting-shared-util-server-env-testing-local,local" \
"libs/shared/util-server/src/_environments/environment.testing.ts,tingting-shared-util-server-env-testing,testing" \
"libs/social/module/src/_environments/environment.testing.local.ts,tingting-social-module-env-testing-local,local" \
"libs/social/module/src/_environments/environment.testing.ts,tingting-social-module-env-testing,testing" \
)

for SECRET in ${SECRET_MAP[@]}; do
    echo ${SECRET}
done
exit 0