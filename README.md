# 원티드 프리온보딩 4주차 과제

## 💡 11팀

> 참여 인원 (이미지 클릭시 개인 레포지토리로 이동)

| [<img src="https://avatars.githubusercontent.com/u/16061038?v=4" width="120px" /> ](https://www.github.com/GUGIG) | [<img src="https://avatars.githubusercontent.com/u/62875596?v=4" width="120px" /> ](https://www.github.com/dlsxody1) | [<img src="https://avatars.githubusercontent.com/u/57490711?v=4" width="120px" /> ](https://www.github.com/gkdfo40) | [<img src="https://avatars.githubusercontent.com/u/97019802?v=4" width="120px" /> ](https://www.github.com/hjpark625) | [<img src="https://avatars.githubusercontent.com/u/46833758?v=4" width="120px" /> ](https://www.github.com/ggsno) | [<img src="https://avatars.githubusercontent.com/u/111843724?v=4" width="120px" /> ](https://www.github.com/lee12779) | [<img src="https://avatars.githubusercontent.com/u/66675699?v=4" width="120px" /> ](https://www.github.com/happyeveryone96) | [<img src="https://avatars.githubusercontent.com/u/62886997?v=4" width="120px" />](https://www.github.com/HyunSeungBeom) |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **[팀장]정재훈**                                                                                                  | **김인태**                                                                                                           | **김항래**                                                                                                          | **박희주**                                                                                                            | **오강산**                                                                                                        | **이미란**                                                                                                            | **정진우**                                                                                                                  | **현승범**                                                                                                               |

---

> 역할

이번과제는 각자 구현해보고 BestPractice를 산출한뒤에 리팩토링하거나 부족한 부분을 채우는 형식으로 진행하였습니다.

<br />

<br />
<br />

## 🌈 실행 방법

    $ git clone https://github.com/wanted-team-11/pre-onboarding-assignment-week-4-1-team-11.git

    //december_and_company 파일안에 있는 서버를 실행한뒤에 postman으로
    http://localhost:4000/signup
    body에는  {email : xxx@ddd.com , password : 1111}
    형식으로 post요청을 하면 회원가입 완료!
    완료 후에 가동되고있는 서버를 종료하지 않은채로
    로그인 하면됩니다

    $ cd pre-onboarding-assignment-week-4-1-team-11
    $ npm install
    $ npm start

<br />
<br />

---

<br />
<br />

## 📚 기술스택

<br />

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.8.2-3178C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-5.3.5-DB7093?logo=styledcomponents)
![axios](https://img.shields.io/badge/axios-0.27.2-5E22D6)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.3.0-blue?logo=react-router)
![react-query](https://img.shields.io/badge/react--query-4.2.3-red?logo=react-query)
![ant](https://img.shields.io/badge/AntDesign-4.23.2-61DAFB?logo=antdesign)

- 선정 이유

  - React
    - Virtual DOM을 활용하여 빠른 렌더링이 가능
    - 단방향 데이터 바인딩을 통한 디버깅이 용이
  - TypeScript
    - 정적 타입 지원하므로 컴파일 단계에서 오류를 사전에 포착할 수 있으며 이를 통해 미리 디버깅이 가능함
    - 여러가지 패러다임을 활용할 수 있음 (절차지향, 객체지향, 함수형)
  - Styled-Components
    - CSS-in-JS는 짧은 길이의 유니크한 클래스를 자동적으로 생성하기에 코드 경량화에 효과적
    - 스크립트에성의 상수와 함수를 쉽게 공유하여 props를 활용한 조건부 렌더링에 용이
    - 컴포넌트화 시켜 다른곳에서 사용 가능
    - 컴포넌트 기반 개발 방법에 적합하고 가장 많이 사용되는 CSS-in-JS 라이브러리
  - Axios
    - Request와 Reply를 JSON 형태로 자동 변경
      - fetchAPI와 차이점으로 fetchAPI는 요청 후 Promise로 JSON형태로 변환을 해야하지만 axios는 애초에 JSON으로 응답을 해줘서 간결한 코드 작성이 가능
  - React-Router-Dom
    - React의 SPA(Single Page Application)특성상 하나의 페이지(HTML)에서 모든 렌더링이 이루어짐
    - React의 이러한 강점을 활용하기 위해 페이지의 로딩없이 페이지에 필요한 컴포넌트를 렌더링 하기 위해 사용
  - React-Query
    - 서버 데이터를 클라이언트와 동기화하는데 용이
    - 캐싱, 캐시 invalidation 용이
    - 로딩, 에러 관리 용이
  - Ant Design
    - 깔끔한 디자인과 강력한 기능을 제공하는 컴포넌트들을 쉽게 이용가능함
      <br />

---

## 📁 폴더 구조

```
//src
├── pages
│   ├── admin
│   │   └── components
│   ├── auth
│   │   └── components
│   └── error
├── router
├── services
│   ├── api
│   ├── hooks
│   ├── models
│   └── static
├── storage
└── types
```

---

## 📝 요구 사항

- React.js 기반이어야 합니다.
  - Node.js LTS 환경
- [antd](https://ant.design/) 또는 [tailwindcss](https://tailwindcss.com/) 등의 UI 라이브러리나 프레임워크 사용을 권장
  - 사용하시는 라이브러리의 기본 디자인 시스템을 따르되, 필요시 확장하여 개발하시면 됩니다.
- 별도의 API 서버 개발은 필요하지 않습니다.
  - 과제와 함께 제공되는 json-server 를 사용하셔서 개발
  - API 응답값은 항상 정상 응답인 경우를 가정하나, 서버 에러응답, 실패응답, 타임아웃 등의 예외처리에 따른 가산점이 있습니다.
- 일반적인 사용자 PC (1280x1024 이상) 화면에서 문제없이 작동해야 합니다.
- 필요한 조건이 있다면 추가하셔도 좋습니다.
- 특정 패키지 등의 사용 조건은 없습니다.
- 기본으로 주어진 환경의 패키지 버전보다 최신 버전을 사용하셔도 무방합니다.
- 인증된 사용자만 CRUD(생성, 조회, 수정, 삭제) 가 가능해야 합니다.
  - 별도의 회원가입 기능은 필요하지 않습니다.
  - API 호출 예시 참고해서 임의 사용자 생성 후 개발
    <br />

---

## 🚩 구현 기능

### 공통

- 페이지네이션
  - json-server 의 Paginate API 를 사용하여 구현
  - 응답 헤더에 포함되는 x-total-count를 이용해 페이지 전체 수를 가져옴
  - react-query를 이용해 페이지 이동 시 이전 페이지는 캐싱, 새로운 페이지의 정보를 가져옴
  - 페이지 번호를 url 파라미터로 전달, 새로고침 시에도 페이지 유지
  - 필터링 및 검색 시에도 페이지 단위로 가져와 많은 양의 데이터 처리에 유리
- 필터링
  - 클라이언트 사이드에서 데이터를 필터링 하지 않고 서버데이터를 필터링하는 쿼리를 보내 필터링
  - 필터링한 기준을 url 파라미터로 전달, 새로고침 시에도 페이지 유지
- 검색
  - json-server 의 Full-text Search API 를 사용하여 구현
  - 검색한 쿼리를 url 파라미터로 전달, 새로고침 시에도 페이지 유지
- **파편화된 서버 데이터를 클라이언트 사이드에서 사용하기 용이하게 정제해 렌더링**

### 로그인 페이지

- 로그인 후 access token 저장 (localStorage)

### 사용자 목록 페이지

- 사용자 목록 불러오기
- 사용자 추가, 이름수정, 삭제
  - POST, PUT, DELETE 시에 react-query의 cache invalidation으로 상태 최신화

### 사용자 상세 페이지

- 사용자의 상세정보, 계좌 목록 불러오기

### 계좌 목록 페이지

- 계좌 목록 불러오기

### 계좌 상세 페이지

- 계좌 상세정보 불러오기

---

## 🙏 Commit Convention

|   Type   | Description                   |
| :------: | ----------------------------- |
|   feat   | Add a new feature             |
|   fix    | Fix the bug                   |
|  design  | UI design changes such as CSS |
|  style   | code formatting               |
| refactor | Refactoring the code          |
|   docs   | Modify the document           |
|  chore   | etc.                          |
