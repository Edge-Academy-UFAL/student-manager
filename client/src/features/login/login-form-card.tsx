import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import { LoginForm } from './login-form';

export function LoginFormCard() {
  return (
    <Card className="h-fit w-full rounded-md lg:max-w-lg">
      <CardHeader>
        <CardTitle className="text-action-950 text-heading-md text-center">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
