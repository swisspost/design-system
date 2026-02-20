import {
  PostHeader,
  PostLanguageMenuItem,
  PostLanguageMenu,
  PostLogo,
} from '@swisspost/design-system-components-react/server';

export default function Home() {
  return (
    <PostHeader text-menu="Menu">
      <PostLogo slot="post-logo" url="/">
        Homepage
      </PostLogo>

      <PostLanguageMenu
        text-change-language="Change the language"
        text-current-language="The currently selected language is #name."
        slot="language-menu"
      >
        <PostLanguageMenuItem code="de" name="German">
          de
        </PostLanguageMenuItem>
        <PostLanguageMenuItem code="fr" name="French">
          fr
        </PostLanguageMenuItem>
        <PostLanguageMenuItem code="it" name="Italian">
          it
        </PostLanguageMenuItem>
        <PostLanguageMenuItem active={true} code="en" name="English">
          en
        </PostLanguageMenuItem>
      </PostLanguageMenu>

      <p slot="title">[One Pager Title]</p>
    </PostHeader>
  );
}
