import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { env } from '@junblog/frontend/env/env';
import { motion as m } from 'framer-motion';
import { useApi } from '@junblog/frontend/stores/server';
import { useColor, useFlowStore } from '@junblog/frontend/stores/client';
import { useEffect, useState } from 'react';
import { useMeStore } from '@junblog/frontend/stores/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCustomNode } from '@junblog/frontend/stores/hook';
import { CustomToolbarLock } from '../panel';
import { Ani } from '@junblog/frontend/components/common';

export type NodeData = {
  label: string;
  size: number;
};

export const LoginNode = (props: NodeProps<NodeData>) => {
  const nickname = useMeStore((state) => state.nickname);
  const { mutate } = useApi.useLogOut();
  const user = useFlowStore((state) => state.user);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <CustomToolbarLock props={props}>
      <Ani.Box className={`main-node custom-node dragHandle`} select={props.selected}>
        {props.isConnectable ? (
          <div className="text-center ">
            <div className="login-node">{user.nickname || props.data.label}</div>
            {nickname ? (
              <div className="flex flex-col text-center">
                <img
                  className=" object-contain width-image-container w-full rounded-3xl"
                  src={user.image || '/logo2.png'}
                />
                <div onClick={() => mutate()} className="mindmap-button mt-[1em]">
                  Logout
                </div>
                <div onClick={() => copyToClipboard(`${env.origin}/${user.id}`)} className="mindmap-button mt-[0.3em]">
                  Public Link
                </div>
              </div>
            ) : (
              <Link href={`${env.endpoint}/auth/google`} passHref className="mindmap-button">
                Login
              </Link>
            )}
          </div>
        ) : (
          <div className="text-center ">
            <div className="login-node">{user.nickname || props.data.label}</div>
            <div className="flex flex-col text-center">
              <img
                className=" object-contain width-image-container w-full rounded-3xl"
                src={user.image || '/logo2.png'}
              />
              <div onClick={() => copyToClipboard(`${env.origin}/${user.id}`)} className="mindmap-button mt-[1em]">
                Public Link
              </div>
            </div>
          </div>
        )}
      </Ani.Box>
    </CustomToolbarLock>
  );
};

export const TextNode = (props: NodeProps<NodeData>) => {
  return (
    <CustomToolbarLock props={props}>
      <Ani.Box className={`main-node custom-node dragHandle`} select={props.selected}>
        <div className={`input-node`}>{props.data.label}</div>
      </Ani.Box>
    </CustomToolbarLock>
  );
};

export const LogoNode = (props: NodeProps<NodeData>) => {
  const router = useRouter();

  return (
    <CustomToolbarLock props={props}>
      <Ani.Box onClick={() => router.push('/')} className={`main-node custom-node dragHandle`} select={props.selected}>
        <div className="flex items-center image-node">
          <img className="h-[100%]" src="/logo2.png" height="100%" />
        </div>
      </Ani.Box>
    </CustomToolbarLock>
  );
};
