function Component() {
  return (
    <div className="absolute contents left-[24px] top-[344px]" data-name="ログインボタン">
      <div className="absolute bg-black border-4 border-black border-solid h-[52px] left-[24px] rounded-[32px] top-[344px] w-[300px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Sans_JP:Bold',sans-serif] font-bold h-[52px] justify-center leading-[0] left-[174.5px] text-[24px] text-center text-white top-[370px] w-[301px]">
        <p className="leading-[normal]">ログイン</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents left-0 top-[93px]" data-name="パスワード">
      <div className="absolute bg-[#d9d9d9] border-4 border-black border-solid h-[52px] left-0 rounded-[32px] top-[117px] w-[300px]" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] left-[9px] text-[16px] text-black top-[102.5px] w-[282px]">
        <p className="leading-[normal]">{`パスワード : `}</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute contents left-0 top-0" data-name="メールアドレス">
      <div className="absolute bg-[#d9d9d9] border-4 border-black border-solid h-[52px] left-0 rounded-[32px] top-[24px] w-[300px]" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Sans_JP:Medium',sans-serif] font-medium justify-center leading-[0] left-[9px] text-[16px] text-black top-[9.5px] w-[282px]">
        <p className="leading-[normal]">{`メールアドレス : `}</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[169px] left-[24px] top-[121px] w-[300px]">
      <Component1 />
      <Component2 />
    </div>
  );
}

function LoginForm() {
  return (
    <div className="absolute h-[444px] left-0 top-[222px] w-[349px]" data-name="LoginForm">
      <div className="absolute bg-white border-4 border-black border-solid h-[444px] left-0 rounded-[32px] top-0 w-[349px]" />
      <Component />
      <Frame />
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Sans_JP:Bold',sans-serif] font-bold h-[52px] justify-center leading-[0] left-[174.5px] text-[32px] text-black text-center top-[41px] w-[315px]">
        <p className="leading-[normal]">ログイン</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="[word-break:break-word] absolute contents font-['Noto_Sans_JP:Bold',sans-serif] font-bold leading-[0] left-0 text-black text-center top-0">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[52px] justify-center left-[174.5px] text-[64px] top-[26px] w-[315px]">
        <p className="leading-[normal]">表無し</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[174px] text-[24px] top-[104px] w-[348px]">
        <p className="leading-[normal]">〜地元民だけが知る裏スポット案内アプリ〜</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[666px] left-[27px] top-[117px] w-[349px]">
      <LoginForm />
      <Group />
    </div>
  );
}

export default function IPhone() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 17 - 4">
      <Frame1 />
    </div>
  );
}