type CategoryTabProps = {
  category: string;
};
const CategoryTab = ({ category }: CategoryTabProps) => {
  return (
    <div className="rounded-full bg-light-2 px-3 py-1 text-[13px]">
      {category}
    </div>
  );
};
export default CategoryTab;
