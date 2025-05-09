import { Stack, Text, Button, XStack, YStack, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';

export default function Quest3Screen() {
  const router = useRouter();

  const TableRow = ({ isHeader, leftText, rightText }: { isHeader?: boolean; leftText: string; rightText: string }) => (
    <XStack
      borderBottomWidth={1}
      borderColor="#E0E0E0"
      backgroundColor={isHeader ? "#FFE0B2" : "white"}
      padding="$3"
    >
      <Text width={360} fontSize="$4" fontWeight={isHeader ? "bold" : "normal"} paddingRight="$2" borderRightWidth={1} borderRightColor="#E0E0E0" textAlign={isHeader ? "center" : "left"}>
        {leftText}
      </Text>
      <Text width={60} fontSize="$4" fontWeight={isHeader ? "bold" : "normal"} paddingLeft="$2" textAlign="center">
        {rightText}
      </Text>
    </XStack>
  );

  return (
    <Stack flex={1} backgroundColor="#FFF8E7">
      <ScrollView padding="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center" marginTop="$8" marginBottom="$4">
          퀘스트3: 서로의 최애 카페 분위기 공유하기
        </Text>

        <Stack padding="$4" backgroundColor="white" borderRadius={10} space="$4">
          <Text fontSize="$5" lineHeight={24}>
            - 각자 카페 관련 경험을 자랑하고, 서로의 "카페 레벨"을 측정해보세요.{'\n\n'}
            게임 규칙{'\n'}
            1. 아래의 "카페 경험 미션 리스트"에서 각자 점수를 체크한다{'\n'}
            2. 서로의 점수를 비교해서, 더 높은 사람은 "카페 마스터" 칭호를 받는다.
          </Text>
        </Stack>

        <Stack backgroundColor="white" borderRadius={10} overflow="hidden">
          <TableRow isHeader leftText="미션" rightText="점수" />
          <TableRow leftText="하루에 3개 카페 투어해본 적 있다" rightText="+2" />
          <TableRow leftText="카페에서 공부하다가 영업종료까지 버틴 적 있다" rightText="+2" />
          <TableRow leftText="바리스타 자격증이 있다" rightText="+5" />
          <TableRow leftText="카페에서 혼자 디저트 3개 시켜본 적 있다" rightText="+1" />
          <TableRow leftText="가보고 싶은 카페가 지도에 5개 이상 저장되어 있다" rightText="+1" />
          <TableRow leftText="유명한 카페 오픈런 해본 적 있다" rightText="+4" />
          <TableRow leftText="친구랑 카페에서 4시간 이상 수다 떤 적 있다" rightText="+2" />
          <TableRow leftText="카페 벽지나 인테리어에 대해 이야기해본 적 있다" rightText="+1" />
          <TableRow leftText="테라스석/루프탑석 앉으려고 경쟁한 적 있다" rightText="+1" />
        </Stack>

        <Button
          size="$5"
          backgroundColor="#FFB74D"
          width="100%"
          height={50}
          borderRadius={10}
          onPress={() => {
            router.back();
          }}
        >
          <Text color="white" fontSize="$5" fontWeight="bold">
            뒤로가기
          </Text>
        </Button>
      </ScrollView>
    </Stack>
  );
} 