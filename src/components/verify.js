
export const loginCheck = (pw, loginType) => {
    const str = md5(pw);
    switch (loginType) {
      case "member":
        if (
          pw === '' ||
          str === process.env.NEXT_PUBLIC_MEMBER_LOGIN_1 ||
          str === process.env.NEXT_PUBLIC_MEMBER_LOGIN_2
        ) {
          return true
        }
        break;
      case "calendar":
        if (
          str === process.env.NEXT_PUBLIC_CALENDAR_LOGIN_1 ||
          str === process.env.NEXT_PUBLIC_CALENDAR_LOGIN_2
        ) {
            return true
        }
        break;
      case "administrator":
        if (
          str === process.env.NEXT_PUBLIC_ADMIN_LOGIN_1 ||
          str === process.env.NEXT_PUBLIC_ADMIN_LOGIN_2
        ) {
            return true
        }
        break;
    }
  };