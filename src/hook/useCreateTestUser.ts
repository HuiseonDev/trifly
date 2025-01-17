const useCreateTestUser = (count: number) => {
  const testUsers = [
    {
      nameKor: "김민수",
      gender: "M",
      nameEngLast: "KIM",
      nameEngFirst: "MINSU",
      birth: "19850523",
      phone1: "010",
      phone2: "7634",
      phone3: "9281",
      passport: { number: "M87654321", expDate: "20310501" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "minsu85@naver.com",
    },
    {
      nameKor: "이서윤",
      gender: "F",
      nameEngLast: "LEE",
      nameEngFirst: "SEOYUN",
      birth: "20120714",
      phone1: "010",
      phone2: "4823",
      phone3: "7192",
      passport: { number: "M22334455", expDate: "20320625" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "seoyun7192@gmail.com",
    },
    {
      nameKor: "박준형",
      gender: "M",
      nameEngLast: "PARK",
      nameEngFirst: "JUNHYUNG",
      birth: "19910503",
      phone1: "010",
      phone2: "3587",
      phone3: "6412",
      passport: { number: "M55443322", expDate: "20291212" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "junhyung910503@daum.net",
    },
    {
      nameKor: "윤지아",
      gender: "F",
      nameEngLast: "YOON",
      nameEngFirst: "JIA",
      birth: "19800718",
      phone1: "010",
      phone2: "4826",
      phone3: "9348",
      passport: { number: "M67890123", expDate: "20281230" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "jia9348@gmail.com",
    },
    {
      nameKor: "최지훈",
      gender: "M",
      nameEngLast: "CHOI",
      nameEngFirst: "JIHUN",
      birth: "20231104",
      phone1: "010",
      phone2: "7293",
      phone3: "1548",
      passport: { number: "M78901234", expDate: "20350901" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "jihun1548@naver.com",
    },
    {
      nameKor: "정하은",
      gender: "F",
      nameEngLast: "JEONG",
      nameEngFirst: "HAEUN",
      birth: "20110811",
      phone1: "010",
      phone2: "6248",
      phone3: "9357",
      passport: { number: "M89012345", expDate: "20291102" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "haeun0811@gmail.com",
    },
    {
      nameKor: "한지우",
      gender: "F",
      nameEngLast: "HAN",
      nameEngFirst: "JIWOO",
      birth: "19750315",
      phone1: "010",
      phone2: "5283",
      phone3: "7619",
      passport: { number: "M34561278", expDate: "20300515" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "jiwoo7619@daum.net",
    },
    {
      nameKor: "김성현",
      gender: "M",
      nameEngLast: "KIM",
      nameEngFirst: "SUNGHYUN",
      birth: "19890325",
      phone1: "010",
      phone2: "3759",
      phone3: "8526",
      passport: { number: "M12987456", expDate: "20311020" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "sunghyun89@naver.com",
    },
    {
      nameKor: "이지아",
      gender: "F",
      nameEngLast: "LEE",
      nameEngFirst: "JIA",
      birth: "20150606",
      phone1: "010",
      phone2: "6429",
      phone3: "7814",
      passport: { number: "M45612398", expDate: "20310620" },
      nationality: "대한민국",
      issueCountry: "대한민국",
      email: "jia7814@gmail.com",
    },
  ];

  // 중복되지 않는 랜덤 번호 생성 함수
  const generateRandomNumbers = (count: number) => {
    const uniqueNumbers: number[] = [];
    while (uniqueNumbers.length < count) {
      const randomNum = Math.floor(Math.random() * testUsers.length);
      if (!uniqueNumbers.includes(randomNum)) {
        uniqueNumbers.push(randomNum);
      }
    }
    return uniqueNumbers;
  };

  const randomNumbers = generateRandomNumbers(count);
  return randomNumbers.map((randomNum) => testUsers[randomNum]);
};

export default useCreateTestUser;
