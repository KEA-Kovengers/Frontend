

export default function ArticleContent() {
    return (
        <div style={{ borderBottom: '1px solid #E4E8EB', borderRadius: '1px 1px 0px 0px', display: 'flex', flexDirection: 'column', backgroundColor: '#F9F9F9', marginLeft: "100px", marginRight: "100px" }}>
            <div style={{ flexDirection: 'column', backgroundColor: '#F9F9F9', marginTop: "40px" }}>
                <div style={{ flexDirection: 'column' }}>
                    <div style={{ fontSize: "13px", textAlign: 'start' }}>반응형 웹을 만드는 요소는 여러가지가 있지만, 가장 기본적으로 CSS의 미디어 쿼리가 빠질 수 없지요. 특히 미디어 쿼리의 속성들 중 min-width 또는 max-width를 이용해 브라우저 폭을 인식해서 각 조건에 맞게 처리해 주는 방식이 널리 쓰입니다.
                        아래 코드는 min-width(최소 width)가 1000px, 즉 1000px 이상인 경우에 적용되는 코드이고 </div>
                    <div style={{ marginTop: '50px', marginBottom: '10px', fontSize: "13px", textAlign: 'start', color: '#808080' }}>#맛집 #내돈내산</div>
                </div>
            </div>
        </div>
    );
}
