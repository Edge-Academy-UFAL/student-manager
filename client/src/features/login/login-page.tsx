import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/custom/card';

import { LoginForm } from './login-form';

export function LoginFormCard() {
  return (
    <Card className="h-fit w-full lg:max-w-lg">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
