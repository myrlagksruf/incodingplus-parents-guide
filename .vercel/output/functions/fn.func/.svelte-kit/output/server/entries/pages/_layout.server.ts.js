const parse = [
  [
    "5a81fb60-0832-4f56-9aa8-72788c85983b",
    "강경호"
  ],
  [
    "2e61025b-7b7c-46c6-87f0-894feb7a61e7",
    "강연우"
  ],
  [
    "db9f9ab7-65c1-4ab3-92bd-1f238cd649ce",
    "고은찬"
  ],
  [
    "1fa68b20-ffa3-4d9f-b35a-abe2d0f9928c",
    "김가은"
  ],
  [
    "443ea215-9eef-4850-b690-27d96d8daa04",
    "김동규"
  ],
  [
    "ccfe5114-b03c-4b6a-bd56-79283629912e",
    "김소은"
  ],
  [
    "2fb40988-2a04-4565-89af-89183a0715a2",
    "장준석"
  ],
  [
    "152352c4-097c-4069-9b51-88c696050660",
    "전도현"
  ],
  [
    "522719e4-e66c-4e32-84a1-2f298b94afc2",
    "지윤성"
  ],
  [
    "647814e2-3129-40b7-9fe7-a0398e84a497",
    "최지훈"
  ],
  [
    "00c9a3c2-a13a-4ed2-9c36-2711d21238d0",
    "김태현"
  ],
  [
    "756fbe84-92da-4cd2-a6a1-c6986dc17e83",
    "손준혁"
  ],
  [
    "ec9612e9-91a4-470f-9bec-3b7f8565e169",
    "이루미"
  ],
  [
    "2c84288e-08ba-4c45-844c-0721c96fa5e1",
    "이형주"
  ],
  [
    "65caf2a2-2d8f-4697-8dd0-550b1b48d665",
    "황해린"
  ],
  [
    "99d267fd-71a4-487e-a96e-c85c438a2b2c",
    "신동명"
  ],
  [
    "07fdb572-fc5a-4ef8-b54b-05f758bbbcfa",
    "이시온"
  ],
  [
    "1165613d-92f5-4cbb-a8e1-9000c3dbafd8",
    "이지우"
  ],
  [
    "e3ae4ac6-1101-4c50-a151-17c479e8ba6b",
    "탁도현"
  ],
  [
    "86176a06-67ab-4d9e-b107-3ff61f78b725",
    "한상혁"
  ],
  [
    "ca573420-e73e-4b06-9594-4fcb40c8e247",
    "함윤승"
  ]
];
const YM = "2023-02";
const prerender = false;
const ssr = true;
const y = YM.match(/^\d+/)?.[0] ?? "2023";
const m = YM.match(/\d+$/)?.[0] ?? "0";
const date = new Date(Number(y), Number(m) - 1);
const load = () => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    parse
  };
};
export {
  load,
  prerender,
  ssr
};
