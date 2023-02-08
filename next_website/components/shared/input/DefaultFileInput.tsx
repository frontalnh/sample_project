import { ChangeEvent, ReactNode, useRef } from 'react';

interface DefaultFileInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ButtonComponent: ReactNode;
  accept?: string;
  name?: string;
}

export default function DefaultFileInput({
  onChange,
  ButtonComponent,
  accept = 'image/png, image/jpeg',
}: DefaultFileInputProps) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const clickHandler = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };
  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    await onChange(e);
    e.target.value = null as any;
  };
  return (
    <>
      <input
        style={{ display: 'none' }}
        // accept={accept}
        multiple={false}
        ref={inputFileRef}
        onChange={changeHandler}
        type='file'
      />
      <div onClick={clickHandler}>{ButtonComponent}</div>
    </>
  );
}
