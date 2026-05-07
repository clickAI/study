# Part 4: MCP 도구 (oh-my-claudecode 플러그인, 번역)

> oh-my-claudecode MCP 플러그인이 제공하는 도구들의 한국어 번역입니다.

## AST 도구

### ast_grep_search (AST 패턴 검색)

```
설명: AST 매칭을 사용한 코드 패턴 검색. 텍스트 검색보다 정확합니다.

패턴에 메타변수를 사용하세요:
- $NAME - 단일 AST 노드와 매칭 (식별자, 표현식 등)
- $$$ARGS - 여러 노드와 매칭 (함수 인수, 리스트 항목 등)

예시:
- "function $NAME($$$ARGS)" - 모든 함수 선언 찾기
- "console.log($MSG)" - 모든 console.log 호출 찾기
- "if ($COND) { $$$BODY }" - 모든 if 문 찾기
- "$X === null" - null 동등 비교 찾기
- "import $$$IMPORTS from '$MODULE'" - import 찾기

참고: 패턴은 해당 언어의 유효한 AST 노드여야 합니다.

매개변수:
- pattern (필수, 문자열): 메타변수가 포함된 AST 패턴
- language (필수, 열거형): 프로그래밍 언어 - javascript, typescript, tsx, python, ruby, go, rust, java, kotlin, swift, c, cpp, csharp, html, css, json, yaml
- path (선택, 문자열): 검색 경로
- maxResults (선택, 정수): 최대 결과 수
- context (선택, 정수): 컨텍스트 줄 수
```

### ast_grep_replace (AST 패턴 교체)

```
설명: AST 매칭을 사용한 코드 패턴 교체. 메타변수를 통해 매칭된 내용을 보존합니다.

패턴과 교체 모두에서 메타변수를 사용하세요:
- 패턴의 $NAME이 노드를 캡처하고, 교체에서 $NAME을 사용하여 삽입
- $$$ARGS는 여러 노드를 캡처

예시:
- 패턴: "console.log($MSG)" → 교체: "logger.info($MSG)"
- 패턴: "var $NAME = $VALUE" → 교체: "const $NAME = $VALUE"
- 패턴: "$OBJ.forEach(($ITEM) => { $$$BODY })" → 교체: "for (const $ITEM of $OBJ) { $$$BODY }"

중요: dryRun=true(기본값)는 변경사항만 미리봅니다. 적용하려면 dryRun=false로 설정하세요.

매개변수:
- pattern (필수, 문자열): 매칭할 패턴
- replacement (필수, 문자열): 교체 패턴 (같은 메타변수 사용)
- language (필수, 열거형): 프로그래밍 언어
- path (선택, 문자열): 검색 경로
- dryRun (선택, 불리언): 미리보기만 할지 여부 (기본값: true)
```

---

## LSP 도구

### lsp_hover (호버 정보)

```
설명: 파일의 특정 위치에서 타입 정보, 문서, 시그니처를 가져옵니다. 심볼이 무엇을 나타내는지 이해하는 데 유용합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- line (필수, 정수): 줄 번호 (1부터 시작)
- character (필수, 정수): 줄 내 문자 위치 (0부터 시작)
```

### lsp_goto_definition (정의로 이동)

```
설명: 심볼(함수, 변수, 클래스 등)의 정의 위치를 찾습니다. 심볼이 정의된 파일 경로와 위치를 반환합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- line (필수, 정수): 줄 번호 (1부터 시작)
- character (필수, 정수): 줄 내 문자 위치 (0부터 시작)
```

### lsp_find_references (참조 찾기)

```
설명: 코드베이스 전체에서 심볼에 대한 모든 참조를 찾습니다. 사용 패턴과 변경의 영향을 이해하는 데 유용합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- line (필수, 정수): 줄 번호 (1부터 시작)
- character (필수, 정수): 줄 내 문자 위치 (0부터 시작)
- includeDeclaration (선택, 불리언): 선언을 포함할지 여부
```

### lsp_document_symbols (문서 심볼)

```
설명: 파일의 모든 심볼(함수, 클래스, 변수 등)의 계층적 개요를 가져옵니다. 파일 구조를 이해하는 데 유용합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
```

### lsp_workspace_symbols (워크스페이스 심볼)

```
설명: 전체 워크스페이스에서 이름으로 심볼(함수, 클래스 등)을 검색합니다. 정확한 파일을 모르고 정의를 찾는 데 유용합니다.

매개변수:
- query (필수, 문자열): 검색할 심볼 이름이나 패턴
- file (필수, 문자열): 워크스페이스의 아무 파일 (사용할 언어 서버를 결정하는 데 사용)
```

### lsp_diagnostics (파일 진단)

```
설명: 파일에 대한 언어 서버 진단(오류, 경고, 힌트)을 가져옵니다. 컴파일러를 실행하지 않고 문제를 찾는 데 유용합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- severity (선택, 열거형): "error", "warning", "info", "hint"
```

### lsp_diagnostics_directory (디렉터리 진단)

```
설명: tsc --noEmit(선호) 또는 LSP 반복(폴백)을 사용하여 디렉터리에 대한 프로젝트 수준 진단을 실행합니다. 전체 코드베이스의 오류를 확인하는 데 유용합니다.

매개변수:
- directory (필수, 문자열): 확인할 프로젝트 디렉터리
- strategy (선택, 열거형): "tsc", "lsp", "auto"
```

### lsp_code_actions (코드 액션)

```
설명: 선택 영역에 대해 사용 가능한 코드 액션(리팩토링, 빠른 수정)을 가져옵니다. 적용 가능한 액션 목록을 반환합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- startLine (필수, 정수): 선택 시작 줄 (1부터 시작)
- startCharacter (필수, 정수): 선택 시작 문자 (0부터 시작)
- endLine (필수, 정수): 선택 끝 줄 (1부터 시작)
- endCharacter (필수, 정수): 선택 끝 문자 (0부터 시작)
```

### lsp_code_action_resolve (코드 액션 해결)

```
설명: 특정 코드 액션의 전체 편집 세부사항을 가져옵니다. lsp_code_actions 후에 사용하여 액션이 어떤 변경을 만들지 확인합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- startLine (필수, 정수): 선택 시작 줄 (1부터 시작)
- startCharacter (필수, 정수): 선택 시작 문자 (0부터 시작)
- endLine (필수, 정수): 선택 끝 줄 (1부터 시작)
- endCharacter (필수, 정수): 선택 끝 문자 (0부터 시작)
- actionIndex (필수, 정수): 액션의 인덱스 (1부터 시작, lsp_code_actions 출력에서)
```

### lsp_prepare_rename (이름 변경 준비)

```
설명: 주어진 위치의 심볼이 이름 변경 가능한지 확인합니다. 가능하면 심볼의 범위를 반환합니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- line (필수, 정수): 줄 번호 (1부터 시작)
- character (필수, 정수): 줄 내 문자 위치 (0부터 시작)
```

### lsp_rename (이름 변경)

```
설명: 프로젝트의 모든 파일에서 심볼(변수, 함수, 클래스 등)의 이름을 변경합니다. 수행될 편집 목록을 반환합니다. 변경사항을 자동으로 적용하지 않습니다.

매개변수:
- file (필수, 문자열): 소스 파일 경로
- line (필수, 정수): 줄 번호 (1부터 시작)
- character (필수, 정수): 줄 내 문자 위치 (0부터 시작)
- newName (필수, 문자열): 심볼의 새 이름
```

### lsp_servers (언어 서버 목록)

```
설명: 알려진 모든 언어 서버와 설치 상태를 나열합니다. 사용 가능한 서버와 누락된 서버의 설치 방법을 보여줍니다.

매개변수: 없음
```

---

## 노트패드 도구

### notepad_read (노트패드 읽기)

```
설명: 노트패드 내용을 읽습니다. 전체 노트패드 또는 특정 섹션(priority, working, manual)을 읽을 수 있습니다.

매개변수:
- section (선택, 열거형): "all", "priority", "working", "manual"
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### notepad_write_priority (우선순위 컨텍스트 쓰기)

```
설명: 우선순위 컨텍스트 섹션에 씁니다. 기존 내용을 교체합니다. 500자 미만으로 유지하세요 - 세션 시작 시 항상 로드됩니다.

매개변수:
- content (필수, 문자열): 쓸 내용 (500자 미만 권장)
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### notepad_write_working (작업 메모리 쓰기)

```
설명: 작업 메모리 섹션에 항목을 추가합니다. 항목은 타임스탬프가 찍히고 7일 후 자동 정리됩니다.

매개변수:
- content (필수, 문자열): 새 항목으로 추가할 내용
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### notepad_write_manual (수동 항목 쓰기)

```
설명: 수동 섹션에 항목을 추가합니다. 이 섹션의 내용은 자동으로 정리되지 않습니다.

매개변수:
- content (필수, 문자열): 새 항목으로 추가할 내용
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### notepad_prune (노트패드 정리)

```
설명: N일(기본값: 7일)보다 오래된 작업 메모리 항목을 정리합니다.

매개변수:
- daysOld (선택, 정수): 정리 기준 일수
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### notepad_stats (노트패드 통계)

```
설명: 노트패드에 대한 통계(크기, 항목 수, 가장 오래된 항목)를 가져옵니다.

매개변수:
- workingDirectory (선택, 문자열): 작업 디렉터리
```

---

## 프로젝트 메모리 도구

### project_memory_read (프로젝트 메모리 읽기)

```
설명: 프로젝트 메모리를 읽습니다. 전체 메모리 또는 특정 섹션을 읽을 수 있습니다.

매개변수:
- section (선택, 열거형): "all", "techStack", "build", "conventions", "structure", "notes", "directives"
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### project_memory_write (프로젝트 메모리 쓰기)

```
설명: 프로젝트 메모리를 쓰거나 업데이트합니다. 전체 교체 또는 기존 메모리와 병합할 수 있습니다.

매개변수:
- memory (필수, 객체): 쓸 메모리 객체
- merge (선택, 불리언): 기존 메모리와 병합할지 여부
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### project_memory_add_note (프로젝트 메모리 노트 추가)

```
설명: 프로젝트 메모리에 사용자 정의 노트를 추가합니다. 노트는 분류되어 세션 간에 유지됩니다.

매개변수:
- category (필수, 문자열): 노트 카테고리 (예: "build", "test", "deploy", "env", "architecture")
- content (필수, 문자열): 노트 내용
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### project_memory_add_directive (프로젝트 메모리 지시 추가)

```
설명: 프로젝트 메모리에 사용자 지시를 추가합니다. 지시는 세션 간에 유지되고 압축을 견딥니다.

매개변수:
- directive (필수, 문자열): 지시 (예: "항상 TypeScript strict 모드 사용")
- priority (선택, 열거형): "high", "normal"
- context (선택, 문자열): 추가 맥락
- workingDirectory (선택, 문자열): 작업 디렉터리
```

---

## Python REPL

### python_repl (Python REPL)

```
설명: 영구 REPL 환경에서 Python 코드를 실행합니다. 변수와 상태는 같은 세션 내 호출 간에 유지됩니다. 행동: execute (코드 실행), interrupt (실행 중지), reset (상태 초기화), get_state (메모리/변수 보기). pandas, numpy, matplotlib를 사용한 과학 컴퓨팅을 지원합니다.

매개변수:
- action (필수, 열거형): "execute", "interrupt", "reset", "get_state"
- researchSessionID (필수, 문자열): 연구 세션의 고유 식별자
- code (선택, 문자열): 실행할 Python 코드
- executionLabel (선택, 문자열): 실행 레이블
- executionTimeout (선택, 숫자, 기본값 300000): 실행 타임아웃(ms)
- projectDir (선택, 문자열): 프로젝트 디렉터리
- queueTimeout (선택, 숫자, 기본값 30000): 큐 타임아웃(ms)
```

---

## 세션 검색

### session_search (세션 검색)

```
설명: 이전 로컬 세션 히스토리와 트랜스크립트 아티팩트를 검색합니다. 세션 ID, 타임스탬프, 소스 경로, 일치하는 발췌를 포함한 구조화된 JSON을 반환합니다.

매개변수:
- query (필수, 문자열): 이전 세션 히스토리에서 검색할 텍스트 쿼리
- project (선택, 문자열): 프로젝트 필터
- sessionId (선택, 문자열): 세션 ID 필터
- since (선택, 문자열): 시작 시점 필터
- limit (선택, 정수): 결과 제한
- contextChars (선택, 정수): 컨텍스트 문자 수
- caseSensitive (선택, 불리언): 대소문자 구분 여부
- workingDirectory (선택, 문자열): 작업 디렉터리
```

---

## 상태 도구

### state_read (상태 읽기)

```
설명: 특정 모드(ralph, ultrawork, autopilot 등)의 현재 상태를 읽습니다. JSON 상태 데이터를 반환하거나 상태가 없음을 나타냅니다.

매개변수:
- mode (필수, 열거형): "autopilot", "team", "ralph", "ultrawork", "ultraqa", "ralplan", "omc-teams", "deep-interview"
- session_id (선택, 문자열): 세션 ID
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### state_write (상태 쓰기)

```
설명: 특정 모드의 상태를 쓰거나 업데이트합니다. 존재하지 않으면 상태 파일과 디렉터리를 생성합니다. 일반 필드(active, iteration, phase 등)는 매개변수로 직접 설정할 수 있습니다. 추가 사용자 정의 필드는 선택적 `state` 매개변수로 전달할 수 있습니다. 참고: swarm은 SQLite를 사용하며 이 도구로 쓸 수 없습니다.

매개변수:
- mode (필수, 열거형): "autopilot", "team", "ralph", "ultrawork", "ultraqa", "ralplan", "omc-teams", "deep-interview"
- active (선택, 불리언): 활성 상태
- iteration (선택, 숫자): 반복 횟수
- max_iterations (선택, 숫자): 최대 반복 횟수
- current_phase (선택, 문자열): 현재 단계
- task_description (선택, 문자열): 작업 설명
- plan_path (선택, 문자열): 계획 파일 경로
- started_at (선택, 문자열): 시작 시간
- completed_at (선택, 문자열): 완료 시간
- error (선택, 문자열): 오류 메시지
- session_id (선택, 문자열): 세션 ID
- state (선택, 객체): 추가 사용자 정의 필드
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### state_clear (상태 삭제)

```
설명: 특정 모드의 상태를 삭제합니다. 상태 파일과 관련 마커 파일을 제거합니다.

매개변수:
- mode (필수, 열거형): "autopilot", "team", "ralph", "ultrawork", "ultraqa", "ralplan", "omc-teams", "deep-interview"
- session_id (선택, 문자열): 세션 ID
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### state_list_active (활성 모드 목록)

```
설명: 현재 활성화된 모든 모드를 나열합니다. 활성 상태 파일이 있는 모드를 반환합니다.

매개변수:
- session_id (선택, 문자열): 세션 ID
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### state_get_status (상태 세부 정보)

```
설명: 특정 모드 또는 모든 모드의 상세 상태를 가져옵니다. 활성 상태, 파일 경로, 상태 내용을 보여줍니다.

매개변수:
- mode (선택, 열거형): "autopilot", "team", "ralph", "ultrawork", "ultraqa", "ralplan", "omc-teams", "deep-interview"
- session_id (선택, 문자열): 세션 ID
- workingDirectory (선택, 문자열): 작업 디렉터리
```

---

## 추적 도구

### trace_summary (추적 요약)

```
설명: 에이전트 흐름 추적 세션에 대한 집계 통계를 보여줍니다. hook 통계, 키워드 빈도, 스킬 활성화, 모드 전환, 도구 병목현상을 포함합니다.

매개변수:
- sessionId (선택, 문자열): 세션 ID
- workingDirectory (선택, 문자열): 작업 디렉터리
```

### trace_timeline (추적 타임라인)

```
설명: 시간순으로 에이전트 흐름 추적 타임라인을 보여줍니다. hooks, 키워드, 스킬, 에이전트, 도구를 시간 순서로 표시합니다. 필터를 사용하여 특정 이벤트 유형을 보여줍니다.

매개변수:
- filter (선택, 열거형): "all", "hooks", "skills", "agents", "keywords", "tools", "modes"
- last (선택, 숫자): 마지막 N개 이벤트
- sessionId (선택, 문자열): 세션 ID
- workingDirectory (선택, 문자열): 작업 디렉터리
```
