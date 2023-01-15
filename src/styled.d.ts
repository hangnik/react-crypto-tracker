// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    titleColor: string;
    bgColor: string;
    accentColor: stirng;
    cardBgColor: string;
    upArrowColor: string;
    downArrowColor: string;
    flatArrowColor: string;
  }
}
