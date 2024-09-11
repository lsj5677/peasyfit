type TAvatar = {
  image?: string | null;
};

export default function Avatar({ image }: TAvatar) {
  return (
    <div className="avatar">
      <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-1">
        <img
          src={image ?? undefined}
          alt="user-profile"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
