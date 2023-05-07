import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { credentials } from 'grpc';
import { join } from 'path';
import { AuthClient } from './grpc/proto/authPackage/Auth';
import { AuthRequest } from './grpc/proto/authPackage/AuthRequest';
import { AuthResponse } from './grpc/proto/authPackage/AuthResponse';

@Controller()
export class AppController {}
