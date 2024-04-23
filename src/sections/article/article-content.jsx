import ArticleKakaoMap from './article-kakao-map';

export default function ArticleContent() {
  return (
    <div
      style={{
        borderBottom: '1px solid #E4E8EB',
        borderRadius: '1px 1px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9F9F9',
        marginLeft: '100px',
        marginRight: '100px',
      }}
    >
      <div style={{ flexDirection: 'column', backgroundColor: '#F9F9F9', marginTop: '20px' }}>
        <div style={{ flexDirection: 'column' }}>
          <div style={{ fontSize: '30px' }}>🐈 🏠</div>
          <div style={{ fontSize: '13px', textAlign: 'start', margin: '3px 0 3px 0' }}>
            집사님들이라면 공감하실거예요. 고양이 감기 증상 때문에 스트레스 받았던 1인입니다.
            <br />
            처음에는 훌쩍거리는 단순한 코감기만 있었던 것 같은데 이제는 눈곱까지 생기면서 문제가
            생기기 시작했어요.
            <br /> 최근에 계속 이런 상태라서 카페에 찾아보니까
          </div>
          <div
            style={{
              fontSize: '14px',
              textAlign: 'start',
              textDecoration: 'underline',
              margin: '3px 0 3px 0',
            }}
          >
            <br />
            혹시 허피스가 아니냐고 했어요.
          </div>
          <div style={{ fontSize: '13px', textAlign: 'start', margin: '3px 0 3px 0' }}>
            <br />
            그래서 영양제를 먹이면 더 나을거라고 해서 좋은 제품을 소개받게 되었어요. 많은 분들이
            직접 급여해보고 괜찮다고 말씀하시니까 저도 먹이고픈 마음이 들었거든요.
            <br />
            <br />
          </div>
          <h2
            style={{
              fontSize: '16px',
              textAlign: 'start',
              margin: '3px 0 3px 0',
            }}
          >
            허피스바이러스
          </h2>
          <div style={{ fontSize: '13px', textAlign: 'start', margin: '3px 0 3px 0' }}>
            는 보통 일주일 잠복기가 있고 콧물부터 눈곱, 눈이 충혈되며 기침까지 다양한 증상이 나타날
            수 있다고 해요. <br />
            심각해지면 결막염과 폐렴, 구내염까지 생길 수 있어요. 꾸준히 관리를 해주지 않으면 언제든
            또 발병을 할 수 있어서 계속 케어가 필요하다고 해요. 이게 없어지는건줄 알았는데 그렇지
            않고 계속 잠복해있다가 나타나는 거라고 해요. 보통 열마리중 여덞마리는 이 바이러스를
            보유하고 있고 무증상으로 계속 배출한다고해요. 저희 아이의 경우에는 눈곱도 많이
            늘어났는데다 계속 기침도 하기 시작했어요. 열도 나는 증상이 있다는데 다행히 열은 없긴
            했었거든요.
          </div>
          <div style={{ fontSize: '14px', textAlign: 'start', color: 'red', fontWeight: 'bold' }}>
            <br />
            의심되는 상황이라면 계속 내버려두지 말고 일단 케어를 받는 것이 중요해요.
          </div>

          <div style={{ fontSize: '13px', textAlign: 'start' }}>
            <br />
            그리고 나서 다 낫고 난 후라도 영양제와 같은 방법으로 쭉 관리를 해주어야겠더라고요.
          </div>
          <ArticleKakaoMap />
          <div
            style={{
              marginTop: '50px',
              marginBottom: '10px',
              fontSize: '13px',
              textAlign: 'start',
              color: '#808080',
            }}
          >
            #고양이 감기 #허피스 #허피스바이러스
          </div>
        </div>
      </div>
    </div>
  );
}
