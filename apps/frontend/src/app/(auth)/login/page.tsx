import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background font-body flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-text">다시 오셨군요!</h1>
          <p className="text-sm text-text-secondary mt-1">계정에 로그인하세요</p>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary mt-6">
          계정이 없으신가요?{' '}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
