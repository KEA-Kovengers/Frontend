import ArticleTitle from "../article-title";
import ArticleUser from "../article-user";
import ArticleContent from "../article-content";
import AiWidget from "../article-ai-widget";
import ArticleCommunity from "../article-community";

export default function ArticleView() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "auto" }}>
            <div style={{ boxShadow: "0px 0px 10px 1px rgba(128, 128, 128, 0.2)", height: "auto", width: "70%", borderRadius: "10px", textAlign: "center", paddingBottom: '30px' }}>
                <ArticleUser />
                <ArticleTitle />
                <ArticleContent />
                <AiWidget />
                <ArticleCommunity />
            </div>
        </div>
    );
}
