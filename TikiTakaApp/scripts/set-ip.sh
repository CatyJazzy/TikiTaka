#!/bin/bash

# IP 주소 가져오기
IP_ADDRESS=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}')

# .env 파일 생성 또는 업데이트
echo "EXPO_PUBLIC_API_URL=http://${IP_ADDRESS}:3000" > .env

echo "IP 주소가 .env 파일에 설정되었습니다: ${IP_ADDRESS}" 