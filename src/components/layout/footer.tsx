/**
 * 블로그 푸터 컴포넌트
 */
import { Container } from './container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <Container>
        <div className="py-6">
          <p className="text-muted-foreground text-center text-sm">
            © {currentYear} 오늘의 경제뉴스 겟. Powered by Notion CMS.
          </p>
        </div>
      </Container>
    </footer>
  )
}
