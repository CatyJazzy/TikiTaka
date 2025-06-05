#!/bin/bash

# 운영체제 확인
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows 환경
    IP_ADDRESS=$(ipconfig | grep "IPv4" | grep -v "127.0.0.1" | awk '{print $NF}')
else
    # macOS/Linux 환경
    IP_ADDRESS=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}')
fi

# IP 주소가 비어있는지 확인
if [ -z "$IP_ADDRESS" ]; then
    echo "IP 주소를 찾을 수 없습니다. 수동으로 입력해주세요."

    read -p "IP 주소를 입력하세요: " IP_ADDRESS
fi

# .env 파일 생성 또는 업데이트 (TikiTakaApp 루트 디렉토리에)
echo "EXPO_PUBLIC_API_URL=http://${IP_ADDRESS}:3000" > .env

echo "IP 주소가 .env 파일에 설정되었습니다: ${IP_ADDRESS}"
