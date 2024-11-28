# JoinCrew API 명세서

## User

### 회원가입
**Endpoint**: POST/users/join  
**Request**:
```json
{
    "email": "user@example.com",
    "password": "password"
}
```
**Response**:
```json
{
   "message" : "회원가입이 완료되었습니다."
}
```

### 로그인
**Endpoint**: POST/users/login  
**Request**:
```json
{
    "email": "user@example.com",
    "password": "password"
}
```
+ 쿠키(토큰) 저장  
**Response**:
```json
{
   "message" : "로그인 성공"
}
```


<br></br>
## Events

**Response**: HTTP-status-code 201

### 전체 모임 조회
**Endpoint**: GET/events

**Request**:

**Response**: HTTP-status-code 200
```json
[
    {   "id" : 1
        "title": "일정 제목",
        "event_date" : "2024-11-29 10:00:00 ",
        "leader_id" : 1,
        "max_members" : 6,
        "location" : "서울시 강서구",
        "ages" : "20대",
        "content" : "상세내용"

    },
    {   "id" : 1
        "title": "일정 제목",
        "event_date" : "2024-11-29 10:00:00 ",
        "leader_id" : 1,
        "max_members" : 6,
        "location" : "서울시 강서구",
        "ages" : "20대",
        "content" : "상세내용"

    }
]
```
### 모임 상세 조회
**Endpoint**: GET/events/:id

**Request**:

**Response**: HTTP-status-code 200
```json
[
    {   "id" : 1
        "title": "일정 제목",
        "event_date" : "2024-11-29 10:00:00 ",
        "leader_id" : 1,
        "max_members" : 6,
        "location" : "서울시 강서구",
        "ages" : "20대",
        "content" : "상세내용",
        "is_leader" : "사용자가 모임의 리더인지 아닌지 판별"

    }
]
```


### 모임 삭제
**Endpoint**: DELETE/events/:id  

**Request**:

**Response**: HTTP-status-code 200

### 모임 등록

**Endpoint**: POST/events/:id  

**Request**: 
```json
            {
              "title" : "제목" , 
              "content" : "내용",
              "max_member" : "모집인원", 
              "location" : "위치", 
              "ages" : "연령", 
              "event_date" : "날짜와 시간"
            }
```
**Response**: HTTP-status-code 200

<br><br>


## Crew

### 모임 참가
**Endpoint**: POST/crew/:id  

**Request**:
```json
{
    "is_full : "boolean",
    "title" : "공유된 일정 제목",
}
```
**Response**: HTTP-status-code 201

### 모임 탈퇴
**Endpoint**: DELETE/crew/:id  

**Request**:

**Response**: HTTP-status-code 200


### 모임에 참여중인지 확인
**Endpoint**: DELETE/crew/:id  

**Request**: 
```json
        {
         hasJoined : true
        }
```

**Response**: HTTP-status-code 200

