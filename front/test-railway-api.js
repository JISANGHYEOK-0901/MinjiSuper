// Railway API 테스트 스크립트
const API_BASE_URL = 'https://be-production-32e8.up.railway.app';

// 헬스체크 테스트
async function testHealthCheck() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiry/health`);
    const data = await response.json();
    console.log('✅ Health Check Success:', data);
    return true;
  } catch (error) {
    console.error('❌ Health Check Failed:', error);
    return false;
  }
}

// 이메일 상태 확인
async function testEmailStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiry/email-status`);
    const data = await response.json();
    console.log('📧 Email Status:', data);
    return data.available;
  } catch (error) {
    console.error('❌ Email Status Check Failed:', error);
    return false;
  }
}

// 문의 접수 테스트
async function testInquirySubmission() {
  const testData = {
    name: "테스트 사용자",
    phone: "01012345678",
    email: "test@example.com",
    businessType: "창업",
    province: "서울특별시",
    city: "강남구",
    agreed: true
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Inquiry Submission Success:', data);
      return true;
    } else {
      const errorData = await response.json();
      console.error('❌ Inquiry Submission Failed:', errorData);
      return false;
    }
  } catch (error) {
    console.error('❌ Inquiry Submission Error:', error);
    return false;
  }
}

// 전체 테스트 실행
async function runAllTests() {
  console.log('🚀 Railway API 테스트 시작...\n');
  
  console.log('1. 헬스체크 테스트');
  const healthOk = await testHealthCheck();
  
  console.log('\n2. 이메일 상태 확인');
  const emailOk = await testEmailStatus();
  
  console.log('\n3. 문의 접수 테스트');
  const inquiryOk = await testInquirySubmission();
  
  console.log('\n📊 테스트 결과:');
  console.log(`헬스체크: ${healthOk ? '✅' : '❌'}`);
  console.log(`이메일 서비스: ${emailOk ? '✅' : '❌'}`);
  console.log(`문의 접수: ${inquiryOk ? '✅' : '❌'}`);
  
  if (healthOk && emailOk && inquiryOk) {
    console.log('\n🎉 모든 테스트 통과! Railway 연동 완료!');
  } else {
    console.log('\n⚠️ 일부 테스트 실패. 설정을 확인하세요.');
  }
}

// 브라우저 콘솔에서 실행
if (typeof window !== 'undefined') {
  window.testRailwayAPI = runAllTests;
  console.log('브라우저 콘솔에서 testRailwayAPI() 함수를 실행하세요.');
} else {
  // Node.js 환경에서 실행
  runAllTests();
}
