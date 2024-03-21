# 기본 이미지를 지정합니다.
FROM jenkins/jenkins:lts

# SSH 설치
User root

RUN apt-get update && \
    apt-get install -y openssh-server
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh
# SSH 서버 설정을 추가합니다.
# COPY sshd_config /etc/ssh/sshd_config
RUN sed -ri 's/^#?PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/^#?PasswordAuthentication\s+.*/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -ri 's/^#?RSAAuthentication\s+.*/RSAAuthentication yes/' /etc/ssh/sshd_config
RUN sed -ri 's/^#?RSAAuthentication\s+.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config
RUN sed -ri 's/^#?AuthorizedKeysFile\s+.*/AuthorizedKeysFile      \/root\/.ssh\/authorized_keys/' /etc/ssh/sshd_config
RUN sed -i 's/#Subsystem/Subsystem/' /etc/ssh/sshd_config

# SSH 키 복사
COPY keys /root/.ssh/keys
RUN cat /root/.ssh/keys/root.pub >> /root/.ssh/authorized_keys

# 키 권한 설정
RUN chmod 700 /root/.ssh && \
    chmod 600 /root/.ssh/*
RUN mkdir -p /var/run/sshd
RUN update-rc.d ssh defaults
# Jenkins 사용자에게 sudo 권한 부여 (옵션)
RUN echo "jenkins ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN systemctl enable ssh.service
# SSH 서버 실행 & Jenkins 실행
EXPOSE 22 8080
CMD service ssh start; /usr/bin/tini -- /usr/local/bin/jenkins.sh;

# SSH 포트 열기

