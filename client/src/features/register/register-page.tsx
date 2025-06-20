import StudentRegisterFormComponent from '@/features/register/register-form';

export default function StudentRegisterPageComponent() {
  return (
    <main className="p-[24px]">
      <div className="mb-4">
        <h1>Header</h1>
        <p>Descripion</p>
      </div>
      <StudentRegisterFormComponent />
    </main>
  );
}
