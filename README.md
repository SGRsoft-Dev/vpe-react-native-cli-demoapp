# VPE React Native SDK V2 DEMO APP (React Native CLI)

React Native 를 지원하는 크로스플랫폼 비디오 플레이어 SDK
([`vpe-react-native-cli`](https://www.npmjs.com/package/vpe-react-native-cli) V2) 의
기능을 한 화면씩 시연하는 **React Native CLI (bare workflow)** 데모 앱입니다.
JSON 레이아웃, 스트리밍 프로토콜, 반응형 디자인을 지원합니다.

> 이 앱은 [Expo 데모 앱(`vpe-react-native-demoapp`)](../vpe-react-native-demoapp) 을
> **React Native CLI 버전으로 미러링**한 것입니다.
> 동일한 데모 화면(`src/`)을 사용하되, Expo 모듈 대신 bare RN 모듈과
> `vpe-react-native-cli` 패키지를 사용합니다.

## 개발자 가이드 문서
https://developer.vpe.naverncp.com/docs/rn/intro

## Video Player Enhancement 소개
https://www.ncloud.com/product/media/videoPlayerEnhancement

- 네이버클라우드 플랫폼 제공 Video Player Enhancement 의 React Native SDK
- 해당 SDK는 Standard 요금제를 이용해야 사용 가능합니다.
- 본 데모 앱은 SDK V2 (`vpe-react-native-cli@^2.2.1`) 를 사용합니다.

---

## Expo 버전과의 차이

| 항목 | Expo 데모 (`vpe-react-native-demoapp`) | CLI 데모 (본 프로젝트) |
|---|---|---|
| SDK 패키지 | `vpe-react-native` | **`vpe-react-native-cli`** |
| 워크플로우 | Expo managed (`expo prebuild`) | React Native CLI (bare) |
| 진입점 | `registerRootComponent` (`expo`) | `AppRegistry.registerComponent` (`index.js`) |
| 앱 ID 조회 | `expo-application` | **`react-native-device-info`** (`KeyChange.js`) |
| 단말 정보/네트워크/방향/로케일 | `expo-network`, `expo-screen-orientation`, `expo-localization` 등 | `@react-native-community/netinfo`, `react-native-orientation-locker`, `react-native-localize` 등 |
| 네이티브 설정 | `app.json` plugins + config plugin | `android/`, `ios/` 네이티브 프로젝트 직접 관리 |

데모 화면 코드(`src/*.js`)는 SDK import 경로(`vpe-react-native-cli`)와
`KeyChange.js` 의 appId 조회를 제외하면 Expo 버전과 동일합니다.

---

## SDK peer dependency

`vpe-react-native-cli` 는 다음 peer dependency 를 사용합니다 (`package.json` 에 이미 포함됨).

```sh
npm install @sgrsoft/react-native-video react-native-svg react-native-capture-protection \
            phosphor-react-native @react-native-community/netinfo react-native-device-info \
            react-native-localize react-native-orientation-locker react-native-safe-area-context
```

---

## 초기 설정

```sh
# 1. JS 의존성 설치
npm install

# 2. iOS CocoaPods 설치
bundle install        # 최초 1회
npm run pods          # = cd ios && bundle exec pod install
```

> Expo GO 에서는 동작하지 않습니다. 네이티브 빌드로 실행하세요.

## iOS 실행

```sh
npm run ios
# 또는 시뮬레이터 지정
npm run ios:simulator
```

## Android 실행

```sh
npm run android
```

---

## 네이티브 설정 (이미 적용됨)

Expo config plugin / `app.json` 으로 처리하던 설정을 네이티브 프로젝트에 직접 반영했습니다.

- **Bundle ID / applicationId**: `com.vpe.rn.testapp.v3`
  — 기본 라이선스 키(`src/lib/lickeyhook.js`)가 이 App ID 에 발급된 것이므로,
    변경 시 라이선스 키도 함께 교체해야 재생됩니다.
- **Android 권한**: `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PLAYBACK`,
  `READ_MEDIA_IMAGES`(`maxSdkVersion=34`, Expo `withReadMediaImagesPermissionFix` plugin 미러링)
- **Android PiP**: `MainActivity` 에 `supportsPictureInPicture` / `resizeableActivity`
- **iOS Info.plist**: `UIBackgroundModes`(audio, fetch), `ITSAppUsesNonExemptEncryption=false`

---

## 데모 화면 목록

`src/HomeScreen.js` 에서 모든 데모로 이동할 수 있습니다.

| 데모 | 내용 |
|---|---|
| **BasicDemo** | UGC 표준 사용 예 |
| **LayoutDemo** | 사용자 정의 layout (pc/mobile/fullscreen × vod/live) |
| **ControlsShowcase** | 모든 컨트롤 컴포넌트를 한 화면에서 디자인 검증 |
| **LiveDemo** | LL HLS 라이브 |
| **Drm / NcpDrm** | PallyCon / Ncloud DRM |
| **Pip** | Picture-in-Picture |
| **Watermark** | 워터마크 표시 |
| **ScreenRecordingPrevention** | 화면 녹화 방지 |
| **FullscreenDemo** | 풀스크린 동작 |
| **CustomButton / IconChange** | 컨트롤 아이콘 / 버튼 커스터마이징 |
| **Override / ErrorOverride** | 동작 / 에러 메시지 오버라이드 |
| **PlayerEvent** | 이벤트 콜백 검증 |
| **Method** | playerRef 메서드 호출 |
| **StartTime** | 시작 위치 지정 |
| **NoOption** | 옵션 없는 최소 구성 |
| **VTTPasre** | VTT 파싱 |
| **KeyChange** | 라이선스 키/AppId 런타임 변경 |

---

## 개발용 라이선스 키 설정 (`src/lib/lickeyhook.js`)

데모 앱은 모든 화면에서 `loadKey()` 훅을 통해 `accessKey` / `devTestAppId` 를 주입합니다.
키 값을 바꾸려면 `src/lib/lickeyhook.js` 의 디폴트 값을 수정하거나, `KeyChange` 데모로
런타임에 변경 후 AsyncStorage 에 저장할 수 있습니다.

```js
// src/lib/lickeyhook.js
const [testKey, setTestKey] = useState('YOUR_VPE_ACCESS_KEY');
const [testAppId, setTestAppId] = useState('YOUR_APP_ID'); // 네이티브 Bundle ID 와 일치해야 함
```

사용 예:

```js
import { VpePlayer } from 'vpe-react-native-cli';
import { loadKey } from './lib/lickeyhook';

const lkey = loadKey();

<VpePlayer
    ref={playerRef}
    devTestAppId={lkey.testAppId}
    accessKey={lkey.testKey}
    platform={lkey.isGov ? 'gov' : 'pub'}
    stage={lkey.isBeta ? 'beta' : 'prod'}
    isDev={lkey.isDev ? true : false}
    events={{ backPress: () => navigation.goBack() }}
    options={{ playlist: [{ file: '...m3u8' }] }}
/>
```

---

## 네이티브 프로젝트 재생성

`android/` 와 `ios/` 는 React Native 0.81.5 템플릿으로 생성되었습니다.
필요 시 다음으로 재생성할 수 있습니다 (생성 후 위 "네이티브 설정"을 다시 적용).

```sh
npx @react-native-community/cli@20.0.2 init VpePlayerCliDemo --version 0.81.5
```
