# 🪙TokenUs🪙
- 이화여자대학교 컴퓨터공학과 캡스톤디자인과창업프로젝트A,B
- 개발 기간: 2024.09 ~ 진행 중

## Team Info : 8시 스쿼시 연맹
| 안희재 | 서지민 | 김원영 |
| --- | --- | --- |
| @AnyJae | @SeoJimin1234    | @lasagna10 |
| -FE 개발<br>-SmartContract개발 | -BE 개발<br>-ML 개발<br>-SmartContract 개발| -UX/UI 디자인<br>-FE개발<br>-SmartContract 개발 |
</br></br>

## 프로젝트 소개
 크리에이터가 만든 영상 콘텐츠를 디지털 자산으로 보호하고 거래할 수 있도록 지원하는 Web3 기반 창작자 보호형 영상 공유 플랫폼.
#### 주요 기능1️⃣ : 영상 유사도 검사<br>
사전 학습된 ResNet-50 모델과 Cosine Similarity를 활용한 유사도 검사. 영상의 고유성과 NFT의 가치를 보호하고, 불법 복제 방지.
#### 주요 기능2️⃣ : NFT 발행<br>
EVM 호환 Polygon 네트워크를 기반으로 한 NFT 발행.
#### 주요 기능3️⃣ : NFT 거래<br>
플랫폼 개입 없이 유저 간 자유로운 P2P NFT 거래. 
</br></br>

## Front Stacks
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><br>
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><br>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><br>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><br>
<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"><br>
</br></br>

## How To Run
#### 1. 의존성 설치
```bash
npm install
#또는
yarn install
```
#### 2. 개발 서버 실행 (VITE)
```bash
npm run dev
#또는
yarn dev
```
개발 서버는 기본적으로 http://localhost:5173 에서 실행됩니다.
</br></br>

## Project Structure
```
src/
├── abis/          # 스마트 컨트랙트 ABI 파일
├── assets/        # 이미지, 폰트 등 정적 파일
├── components/    # 재사용 가능한 컴포넌트
├── constants/     # 상수 정의
├── layout/        # 레이아웃 관련 컴포넌트
├── pages/         # 페이지 컴포넌트
├── services/      # API 서비스
└── utils/         # 유틸리티 함수
```
