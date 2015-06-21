#!/bin/bash

env USE_GLOBAL_ADK=t meteor build ../build --directory --server=http://golf.ovh --verbose
