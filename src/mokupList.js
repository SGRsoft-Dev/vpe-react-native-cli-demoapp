import { Image, Pressable, Text, View } from 'react-native';
import * as Ph from 'phosphor-react-native';

export default function () {
	return (
		<>
			<View style={{ marginTop: 25 }}>
				<Image
					source={{
						uri: 'https://player.vpe.naverncp.com/images/hq720.jpg',
					}}
					style={{
						width: '100%',
						aspectRatio: '16/9',
						borderRadius: 10,
					}}
				/>
				<View style={{ marginTop: 10 }}>
					<Text style={{ fontSize: 15, fontWeight: 500 }}>
						[하이라이트] 김풍의 폭주는 윤남노를 불안하게 해요..!! 3승이 걸린 '15분 집밥' 타임 어택💦💦
					</Text>
				</View>
			</View>
			<View style={{ marginTop: 15 }}>
				<Image
					source={{
						uri: 'https://player.vpe.naverncp.com/images/hq720.jpg',
					}}
					style={{
						width: '100%',
						aspectRatio: '16/9',
						borderRadius: 10,
					}}
				/>
				<View style={{ marginTop: 10 }}>
					<Text style={{ fontSize: 15, fontWeight: 500 }}>
						[하이라이트] 김풍의 폭주는 윤남노를 불안하게 해요..!! 3승이 걸린 '15분 집밥' 타임 어택💦💦
					</Text>
				</View>
			</View>
			<View style={{ marginTop: 15 }}>
				<Image
					source={{
						uri: 'https://player.vpe.naverncp.com/images/hq720.jpg',
					}}
					style={{
						width: '100%',
						aspectRatio: '16/9',
						borderRadius: 10,
					}}
				/>
				<View style={{ marginTop: 10 }}>
					<Text style={{ fontSize: 15, fontWeight: 500 }}>
						[하이라이트] 김풍의 폭주는 윤남노를 불안하게 해요..!! 3승이 걸린 '15분 집밥' 타임 어택💦💦
					</Text>
				</View>
			</View>
		</>
	);
}
