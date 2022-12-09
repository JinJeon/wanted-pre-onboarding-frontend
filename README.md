# 원티드 프리 온보딩 프론트엔드 과제

## 1. 프로젝트 실행 방법

해당 레파지토리의 코드를 가져간 뒤, `npm`을 통해서 실행하면 됩니다.

```
git clone https://github.com/JinJeon/wanted-pre-onboarding-frontend.git
cd wanted-pre-onboarding-frontend
npm install
npm run start
```

## 2. 배포 주소

[https://jinjeon-wanted.web.app/todo](https://jinjeon-wanted.web.app/todo)

## 3. 구현 영상

### 회원 가입 ∙ 로그인

[auth.mov](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71f2516a-751d-4ec1-b6ef-6391c29a3fcd/auth.mov)

### 투두 리스트

[todolist.mov](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cb0a68e8-7757-4126-9f5c-60b3c4744459/todolist.mov)

## 4. 기능 구현 정도

### 로그인 / 회원가입 페이지

- [x] `/` 경로 내 로그인 / 회원가입 기능 개발
  - [x] 페이지 내 이메일 입력창, 비밀번호 입력창, 제출 버튼 구성

**Assignment1**

- [x] 이메일 ∙ 비밀번호 유효성 검사기능 구현
  - [x] 이메일 조건(`@` 포함) 설정
  - [x] 비밀번호 조건(8자 이상) 설정
  - [x] 위 조건을 만족 시에만 버튼 활성화

**Assignment2**

- [x] 로그인 API 호출 및 올바른 응답 시 `/todo` 경로로 이동
- [x] 로컬 스토리지에 응답받은 JWT 저장

**Assignment3**

- [x] 로그인 여부에 따른 리다이렉트 처리
  - [x] 토큰 가지고  `/` 페이지 접속 시 `/todo` 경로로 리다이렉트
  - [x] 토큰 없이 `/todo`페이지 접속 시 `/` 경로로 리다이렉트

### 투두 리스트 페이지

**Assignment4**

- [x] `/todo`경로에 접속 시 투두 리스트의 목록 확인
- [x] 리스트 페이지 내 투두 리스트 내용 ∙ 완료 여부 표시
- [x] 리스트 페이지 내 입력창 ∙ 추가 버튼 설정 및, 추가 버튼을 클릭 시 입력창 내용이 새로운 투두 리스트로 추가

**Assignment5**

- [x] 투두 리스트 수정, 삭제 기능 구현
  - [x] 투두 리스트 개별 아이템 우측에 수정 버튼 생성 및 버튼 클릭 시 수정모드 전환 및 내용 수정하도록 설정
  - [x] 수정모드 시 개별 아이템의 우측에 제출버튼과 취소버튼이 표기 및 버튼 클릭 시 수정 내용 제출 또는 취소되도록 설정
  - [x] 투두 리스트의 개별 아이템 우측에 삭제버튼 생성 및 버튼 클릭 시 투두 리스트 삭제
