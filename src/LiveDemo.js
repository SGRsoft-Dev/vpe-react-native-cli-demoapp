import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native-cli';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';
export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const [liveStat, setLiveStat] = useState(null);
	StatusBar.setBarStyle('dark-content');

	const playerRef = useRef(null);

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right', '']} />
			<StatusBar barStyle={'dark-content'} hidden={isFullScreen ? true : false} />

			<VpePlayer
				ref={playerRef}
				devTestAppId={lkey.testAppId}
				accessKey={lkey.testKey}
				platform={lkey.isGov ? 'gov' : 'pub'}
				stage={lkey.isBeta ? 'beta' : 'prod'}
				isDev={lkey.isDev ? true : false}
				events={{
					backPress: () => {
						if (navigation.canGoBack()) {
							navigation.goBack();
						}
					},
					fullScreen: (data) => {
						setIsFullScreen(data.isFullScreen);
					},
					timeupdate: (data) => {
						setLiveStat(data);
					},
				}}
				options={{
					playlist: [
						{
							file: 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
						},
					],
					autostart: true, //구현완료
					muted: true, //구현완료
					aspectRatio: '16/9', //구현완료
					objectFit: 'contain', //구현완료
					lowLatencyMode: true,
				}}
			/>

			{!isFullScreen && (
				<View style={{ padding: 10 }}>
					<View>
						<Text>Live 데모</Text>
					</View>
					{liveStat && (
						<View style={{ marginTop: 6 }}>
							<Text style={{ fontWeight: 'bold' }}>
								라이브 지연{' '}
								{liveStat.liveEdgeOffset == null
									? '측정 불가 (PROGRAM-DATE-TIME 없음)'
									: `${liveStat.liveEdgeOffset.toFixed(2)}초`}
							</Text>
							<Text style={{ color: '#666666', fontSize: 12 }}>
								탐색 가능 구간 {liveStat.seekableDuration?.toFixed(1)}초
							</Text>
							<Text style={{ color: '#666666', fontSize: 12 }}>
								재생 위치 {liveStat.currentTime?.toFixed(1)}초
							</Text>
							<Text style={{ color: '#666666', fontSize: 12 }}>
								버퍼 확보량 {liveStat.playableDuration?.toFixed(1)}초
							</Text>
						</View>
					)}
				</View>
			)}
		</SafeAreaProvider>
	);
}
